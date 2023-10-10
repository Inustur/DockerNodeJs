'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

//Direct to the posting.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'posting.html'));
});

app.post('/postmessage', (req, res) => {
    const { topic, data } = req.body;

    if (!topic || !data) {
        return res.status(400).send('topic and data are required.');
    }

    const timestamp = new Date().toISOString();
    const postMessage = `Topic: ${topic}, Data: ${data}, Timestamp: ${timestamp}\n`;

    // Append the message to posts.txt or create it if it doesn't exist
    fs.appendFile('posts.txt', postMessage, (err) => {
        if (err) {
            console.error('Failed to write to file', err);
            return res.status(500).send('Server error.');
        }

        res.send('Message saved successfully.');
    });
});

app.listen(PORT, () => {
    console.log(`Hosting on http://localhost:${PORT}`);
});
