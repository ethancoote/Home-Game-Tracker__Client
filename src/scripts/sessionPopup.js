const popupElem = document.querySelector('#session-popup');
const closeBtn = document.querySelector('.session-popup__close');
const profitElems = document.querySelectorAll('.player-tab__profit');
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
    newSession(sessionPlayerId, profit);
});

async function newSession (playerId, profit) {
    const url = `http://localhost:8080/api/sessions/${playerId}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                profit,
                playerId
            })
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



