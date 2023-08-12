const NOTION_SECRET = 'secret_MAD79YjUTt8HpdYjAn8C7iVeLSqjsysbCZF9FKjQVA0';
const NOTION_DATABASE_ID = 'd3e72fa3c5c54591ae5533cfe06ed750';
const NOTION_API_ENDPOINT = 'https://api.notion.com/v1/pages';

async function getUserIP() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
}

async function sendFeedbackToNotion(content) {
    const userIP = await getUserIP();

    const payload = {
        "parent": { "database_id": NOTION_DATABASE_ID },
        "properties": {
            "Feedback": {
                "text": [
                    { "text": { "content": content } }
                ]
            },
            "Ip": {
                "text": [
                    { "text": { "content": userIP } }
                ]
            }
        }
    };

    const response = await fetch(NOTION_API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + NOTION_SECRET,
            'Content-Type': 'application/json',
            'Notion-Version': '2021-05-13'
        },
        body: JSON.stringify(payload)
    });

    return response.json();
}

document.querySelector('#feedbackButton').addEventListener('click', async () => {
    const feedback = document.querySelector('#feedbackInput').value;
    if (feedback) {
        const result = await sendFeedbackToNotion(feedback);
        if (result.id) {
            alert('Feedback enviado exitosamente!');
        } else {
            alert('Hubo un error al enviar el feedback.');
        }
    } else {
        alert('Por favor, ingresa tu feedback.');
    }
});
