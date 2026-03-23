import { isLoggedIn, getUser, getGame } from "./functions";

const userElems = document.querySelectorAll('.user-only');
const currentUserElems = document.querySelectorAll('.current-user-only');
const visitorElems = document.querySelectorAll('.visitor-only');
const otherUserElems = document.querySelectorAll('.other-user-only');

const navUsername = document.querySelector('#nav-username');
const addPlayerCont = document.querySelector('#add-player-container');

const loggedIn = await isLoggedIn();

if (!loggedIn) {
    // visitor
    userElems.forEach(elem => {
        elem.style.setProperty('display', 'none', 'important');
    });
    visitorElems.forEach(elem => {
        elem.style.setProperty('display', 'flex', 'important');
    });
    addPlayerCont.style.setProperty('justify-content', 'end', 'important');
} else {
    // any user
    userElems.forEach(elem => {
        elem.style.setProperty('display', 'flex', 'important');
    });
    visitorElems.forEach(elem => {
        elem.style.setProperty('display', 'none', 'important');
    });
    const user = await getUser();
    navUsername.textContent = user.username;

    // current user only
    
    const game = await getGame();

    if (game.owner_id === user.user_id) {
        currentUserElems.forEach(elem => {
            elem.style.setProperty('display', 'flex', 'important');
        });
        otherUserElems.forEach(elem => {
            elem.style.setProperty('display', 'none', 'important');
        });
        addPlayerCont.style.setProperty('justify-content', 'space-between', 'important');
    } else {
        currentUserElems.forEach(elem => {
            elem.style.setProperty('display', 'none', 'important');
        });
        otherUserElems.forEach(elem => {
            elem.style.setProperty('display', 'flex', 'important');
        });
        addPlayerCont.style.setProperty('justify-content', 'end', 'important');
    }
}