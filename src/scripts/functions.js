export async function submitLoginForm (user, pass) {
    const url = `${import.meta.env.PUBLIC_API_URL}/login`;
    try {
        const response = await fetch(url, { 
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                user,
                pass
            }),
            credentials: 'include',
        });
        if (!response.ok) {
            console.error(`Fetch Failed - ${response.status}`);
            return -1;
        }
        const userSession = await response.json();
        console.log(userSession); //temp
    } catch (err) {
        console.error(`submitLoginForm failed - ${err}`);
        return -2;
    }
}

export async function isLoggedIn () {
    const url = `${import.meta.env.PUBLIC_API_URL}/api/verify`;
    try {
        const response = await fetch(url, { credentials: 'include' });
        if (!response.ok) {
            return false;
        }
        const check = await response.json();
        if (!check.verified) {
            return false;
        }
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export async function getUser () {
    const url = `${import.meta.env.PUBLIC_API_URL}/api/user`;
    try {
        const response = await fetch(url, { credentials: 'include' });
        if (!response.ok) {
            console.log(`Could not find user - ${response.status}`);
            return "";
        }
        const user = await response.json();
        return user;
    } catch (err) {
        console.error(err);
        return "";
    }
}

export async function getGame () {
    const gameId = getGameId();
    const url = `${import.meta.env.PUBLIC_API_URL}/api/game/${gameId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log(`Cannot find game - ${response.status}`);
            return null;
        }
        const game = await response.json();
        return game;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export function getGameId () {
    const gameUrl = location.href;
    const gameId = gameUrl.split('/').at(-1);
    return gameId;
}
