const closeElem = document.querySelector('.new-game__close');
const popupElem = document.querySelector('.new-game');
const newGameBtn = document.querySelector('#new-game-btn');
const form = document.querySelector('.new-game__form');

//TEMP ID
let userId = 1;

closeElem.addEventListener("click", () => {
    popupElem.style.display = "none";
});

newGameBtn.addEventListener("click", () => {
    popupElem.style.display = "flex";
});

form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    createNewGame(name);
});

async function createNewGame (name) {
    const url = `${import.meta.env.PUBLIC_API_URL}/api/game/${userId}`;
    try {
        const response = await fetch(url, 
            {
                method: "POST", 
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    name
                })
            });
        if (!response.ok) {
            console.error(`createNewGame Fetch Error - ${response.status}`);
        }
        const data = await response.json();
        location.href = `${location.origin}/game/${data.gameId}`;
    } catch (err) {
        console.error(err);
    }
}

