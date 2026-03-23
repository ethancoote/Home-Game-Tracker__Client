import { getGameId } from "./functions";

const popupElem = document.querySelector('#session-popup');
const closeBtn = document.querySelector('.session-popup__close');
const profitElems = document.querySelectorAll('.player-tab__profit.owner');
const sessionForm = document.querySelector('.session-popup__form');

let sessionPlayerId = 0; 

closeBtn.addEventListener("click", () => {
    popupElem.style.display = 'none';
});

profitElems.forEach(elem => {
    elem.addEventListener("click", () => {
        popupElem.style.display = 'flex';
        sessionPlayerId = elem.id;
    });
});

sessionForm.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(sessionForm);
    const profit = formData.get('profit');
    if (!isNaN(profit)) {
        newSession(sessionPlayerId, Math.round(profit * 100)/100);
    }
});

async function newSession (playerId, profit) {
    const gameId = await getGameId();
    const url = `${import.meta.env.PUBLIC_API_URL}/api/sessions/${playerId}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                profit,
                playerId,
                gameId,
            }),
            credentials: 'include',
        });
        if (!response.ok) {
            console.error(`New session fetch failed - player_id: ${playerId} - ${response.status}`);
        }
        popupElem.style.display = 'none';
        location.reload();
    } catch (err) {
        console.error(`Failed to created new session - player_id: ${playerId}\n${err}`);
    }
}



