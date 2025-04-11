const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch').default;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle the speech input and send it to the AI model
app.post('/ask', async (req, res) => {
    const userInput = req.body.message;
    console.log('🎤 User said:', userInput);

    try {
        // Example: Fetching the AI model response (replace with the actual API URL)
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            body: JSON.stringify({
                model: "deepseek-r1:1.5b", // Replace with the correct model you are using
                prompt: userInput,
                max_tokens: 100,
                temperature: 0.7
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('🤖 AI response:', data);

        if (data && data.response) {
            res.json({ reply: data.response });  // Send back the AI's response
        } else {
            console.log('❌ No valid response from AI');
            res.status(500).json({ error: 'No valid response from AI' });
        }

    } catch (error) {
        console.error('❌ Fetch error:', error.message);
        res.status(500).json({ error: 'Fetch failed', detail: error.message });
    }
});

// Start the server
app.listen(3000, () => console.log('✅ Server running at http://localhost:3000'));
