const logoutBtn = document.querySelector('#log-out-btn');

logoutBtn.addEventListener("click", async () => {
    const url = `${import.meta.env.PUBLIC_API_URL}/logout`;
    try {
        const response = await fetch(url, { method: 'POST', credentials: 'include' });
        if (!response.ok) {
            console.log(`Log out failed - ${response.status}`);
        } else {
            location.pathname = '/';
        }
    } catch (err) { 
        console.err(err);
    }
});