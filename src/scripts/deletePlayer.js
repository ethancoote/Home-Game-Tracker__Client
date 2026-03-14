const closeElem = document.querySelector('.delete-player__close');
const popupElem = document.querySelector('.delete-player');
const deleteBtns = document.querySelectorAll('.player-tab__delete');
const confirmDelBtn = document.querySelector('#delete-player-btn');

let playerId = 0;

closeElem.addEventListener("click", () => {
    popupElem.style.display = "none";
});

deleteBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        playerId = Number(btn.id.split('-')[2]);
        popupElem.style.display = "flex";
    });
});

confirmDelBtn.addEventListener("click", async () => {
    const url = `${import.meta.env.PUBLIC_API_URL}/api/player/${playerId}`;
    try {
        const response = await fetch(url, {method: "DELETE"});
        if (!response.ok) {
            console.error(`Player delete failed - ${response.status}`)
        }
        location.reload();
    } catch (err) {
        console.error(err);
    }
});

