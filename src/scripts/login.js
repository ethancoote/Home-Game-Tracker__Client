import { submitLoginForm } from "./functions";

const loginForm = document.querySelector('.login__form');
const errorText = document.querySelector('#login-errors');

loginForm.addEventListener("submit", async e => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const user = formData.get('user');
    const pass = formData.get('pass');
    const errorCode = await submitLoginForm(user, pass);
    if (errorCode === -1) {
        errorText.textContent = "Incorrect username or password.";
    } else if (errorCode === -2) {
        errorText.textContent = "Server error.";
    } else {
        location.pathname = '/';
    }
});