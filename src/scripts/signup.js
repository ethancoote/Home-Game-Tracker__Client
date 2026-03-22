import { submitLoginForm } from "./functions";

const signupForm = document.querySelector('.signup__form');
const errorText = document.querySelector('#signup-errors');

signupForm.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(signupForm);
    const user = formData.get('user');
    const pass = formData.get('pass');
    submitSignupForm(user, pass);
});

async function submitSignupForm (user, pass) {
    const url = `${import.meta.env.PUBLIC_API_URL}/signup`;
    try {
        const response = await fetch(url, { 
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                user,
                pass
            })
        });
        
        if (response.status === 500) {
            errorText.textContent = 'Invalid username or password.';
        } else if (response.status === 409) {
            errorText.textContent = 'Username already exists.';
        } else if (response.status === 400) {
            errorText.textContent = 'Username or password too short.';
        }
        if (!response.ok) {
            console.error(`Fetch Failed - ${response.status}`);
            return null;
        }
        const userSession = await response.json();
        await submitLoginForm(user, pass);
        location.pathname = '/';
    } catch (err) {
        console.error(`submitsignupForm failed - ${err}`);
        errorText.textContent = 'Server error.';
    }
}