import { getGameId } from "./functions";

const closeElem = document.querySelector('.update-name__close');
const popupElem = document.querySelector('.update-name');
const editBtns = document.querySelectorAll('.player-tab__edit-name');
const form = document.querySelector('.update-name__form');

let playerId = 0;

closeElem.addEventListener("click", () => {
    popupElem.style.display = "none";
});

editBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        playerId = Number(btn.id.split('-')[2]);
        popupElem.style.display = "flex";
    });
});

form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    updatePlayerName(name);
});

async function updatePlayerName (name) {
    const gameId = getGameId();
    const url = `${import.meta.env.PUBLIC_API_URL}/api/player/${playerId}`;
    try {
        const response = await fetch(url, { 
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                name,
                gameId,
            }),
            credentials: 'include',
        });
        if (!response.ok) {
            console.error(`updatePlayerName failed - ${response.status}`);
        }
        location.reload();
    } catch (err) { 
        console.error(err);
    }
}

