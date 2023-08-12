const widgetContainer = document.querySelector("#MeasuringCX-widget-container");
const NOTION_SECRET = "secret_MAD79YjUTt8HpdYjAn8C7iVeLSqjsysbCZF9FKjQVA0";
const NOTION_DATABASE_ID = "d3e72fa3c5c54591ae5533cfe06ed750";

async function fetchPosts() {
  try {
    const response = await fetch('https://api.MeasuringCX.com/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    await sendToNotion(data);
  } catch (error) {
    console.error('There was a problem:', error);
  }
}

async function sendToNotion(posts) {
  for (let post of posts) {
    const payload = {
      "parent": { "database_id": NOTION_DATABASE_ID },
      "properties": {
        "Title": { "title": [{ "text": { "content": post.title } }] },
        "Content": { "rich_text": [{ "text": { "content": post.body } }] }
      }
    };

    try {
      await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_SECRET}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2021-05-13'
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error(`Error sending post "${post.title}" to Notion:`, error);
    }
  }
}

document.addEventListener("DOMContentLoaded", fetchPosts);
