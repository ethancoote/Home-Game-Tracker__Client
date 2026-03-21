const signupForm = document.querySelector('.signup__form');

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
        if (!response.ok) {
            console.error(`Fetch Failed - ${response.status}`);
        }
        const userSession = await response.json();
        console.log(userSession); //temp
    } catch (err) {
        console.error(`submitsignupForm failed - ${err}`);
    }
}