const loginForm = document.querySelector('.login__form');

loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const user = formData.get('user');
    const pass = formData.get('pass');
    submitLoginForm(user, pass);
});

async function submitLoginForm (user, pass) {
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
        }
        const userSession = await response.json();
        console.log(userSession); //temp
    } catch (err) {
        console.error(`submitLoginForm failed - ${err}`);
    }
}