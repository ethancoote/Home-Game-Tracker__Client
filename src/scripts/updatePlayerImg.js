const dropboxElem = document.querySelector('.update-img__drop-box');
const inputElem = document.querySelector('#profile-img-input');
const popupElem = document.querySelector('.update-img');
const closeElem = document.querySelector('.update-img__close');
const form = document.querySelector('.update-img__form');
const profileBtns = document.querySelectorAll('.player-tab__profile-btn');

let playerId = 0;
closeElem.addEventListener("click", () => {
    closePopup();
});

profileBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        popupElem.style.display = "flex";
        playerId = Number(btn.id.split('-')[1]);
    });
});

dropboxElem.addEventListener("click", () => {
    inputElem.click();
});

inputElem.addEventListener("change", e => {
    const imgFile = e.target.files[0];
    if (!imgFile) {
        return;
    }

    const displayImg = document.createElement("img");
    displayImg.src = URL.createObjectURL(imgFile);
    displayImg.id = "display-img";
    dropboxElem.children[0].style.display = "none";
    dropboxElem.children[1].style.display = "none";
    dropboxElem.append(displayImg);
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const url = `http://localhost:8080/api/profile/${playerId}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
    } catch (err) {
        console.err(`fetch failed - ${err}`);
    }
   location.reload();
});

function closePopup () {
    popupElem.style.display = "none";
    inputElem.value = '';
    if (dropboxElem.children.length > 2) {
        dropboxElem.children[2].style.display = "none";
        dropboxElem.children[1].style.display = "flex";
        dropboxElem.children[0].style.display = "flex";
    }
}


