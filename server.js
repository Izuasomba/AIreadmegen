const express = require('express');
const path = require('path');
const { OpenAI } = require('openai');
const { default: open } = require('open');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.post('/generate', async (req, res) => {
    try {
        const { projectDetails } = req.body;

        if (!projectDetails) {
            return res.status(400).json({ error: 'Project details are required' });
        }

        const prompt = `
You are an AI assistant specialized in generating professional and comprehensive README.md files for open-source projects.
Based on the following project description and details, generate a well-structured README.md in Markdown format.
Include these sections:
1. Project Title
2. Description
3. Features
4. Installation
5. Usage
6. Contributing
7. License
8. Contact

Project Details:
${projectDetails}
        `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You generate professional README.md files." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 1500,
        });

        const readme = completion.choices[0].message.content;
        res.json({ readme });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate README' });
    }
});

app.post('/contact', async (req, res) => {
    try {
    const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }
    
    // Here you would typically handle the contact form submission
        // For example, sending an email or storing in a database
    console.log('Contact form submission:', { name, email, message });
    
        res.json({ success: true, message: 'Message sent successfully' });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    // Open Chrome with the application URL
    open(`http://localhost:${port}`, { app: { name: 'chrome' } });
}); 
