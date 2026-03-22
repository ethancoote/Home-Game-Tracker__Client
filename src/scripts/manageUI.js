import { isLoggedIn, getUser } from "./functions";

const userElems = document.querySelectorAll('.user-only');
const visitorElems = document.querySelectorAll('.visitor-only');
const navUsername = document.querySelector('#nav-username');

const loggedIn = await isLoggedIn();

if (!loggedIn) {
    userElems.forEach(elem => {
        elem.style.setProperty('display', 'none', 'important');
    });
    visitorElems.forEach(elem => {
        elem.style.setProperty('display', 'flex', 'important');
    });
} else {
    userElems.forEach(elem => {
        elem.style.setProperty('display', 'flex', 'important');
    });
    visitorElems.forEach(elem => {
        elem.style.setProperty('display', 'none', 'important');
    });
    const user = await getUser();
    navUsername.textContent = user.username;
}


