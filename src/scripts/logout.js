const logoutBtn = document.querySelector('#log-out-btn');

logoutBtn.addEventListener("click", async () => {
    const url = `${import.meta.env.PUBLIC_API_URL}/logout`;
    try {
        const response = await fetch(url, { method: 'POST', credentials: 'include' });
        if (!response.ok) {
            console.log(`Log out failed - ${response.status}`);
        } else {
            // temp
            console.log('Logged Out')
        }
    } catch (err) { 
        console.err(err);
    }
});