async function getUserIP() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
}

document.querySelector('#feedbackButton').addEventListener('click', async () => {
    const feedback = document.querySelector('#feedbackInput').value;
    const userIP = await getUserIP();
    
    if (feedback) {
        alert(`IP del usuario: ${userIP}\nFeedback: ${feedback}`);
    } else {
        alert('Por favor, ingresa tu feedback.');
    }
});
