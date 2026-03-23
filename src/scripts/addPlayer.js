const popupElem = document.querySelector('.add-player');
const closeBtn = document.querySelector('.add-player__close');
const sessionForm = document.querySelector('.add-player__form');
const addPlayerBtn = document.querySelector('#add-player-btn');

closeBtn.addEventListener("click", () => {
    popupElem.style.display = 'none';
});

addPlayerBtn.addEventListener("click", () => {
    popupElem.style.display = 'flex';
});

sessionForm.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(sessionForm);
    const playerName = formData.get('player-name');
    const gameId = popupElem.id.split('-')[2];
    newSession(gameId, playerName);
});

async function newSession (gameId, name) {
    const url = `${import.meta.env.PUBLIC_API_URL}/api/players/${gameId}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name,
                gameId
            }),
            credentials: 'include',
        });
        if (!response.ok) {
            console.error(`New session fetch failed - player_id: ${gameId} - ${response.status}`);
        }
        popupElem.style.display = 'none';
        location.reload();
    } catch (err) {
        console.error(`Failed to created new session - player_id: ${gameId}\n${err}`);
    }
}