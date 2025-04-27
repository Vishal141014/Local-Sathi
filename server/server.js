const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_FILE = path.join(__dirname, 'database.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..')));

// Initialize database file if it doesn't exist
if (!fs.existsSync(DATABASE_FILE)) {
    fs.writeFileSync(DATABASE_FILE, JSON.stringify({ submissions: [] }));
}

// Read database
function readDatabase() {
    const data = fs.readFileSync(DATABASE_FILE, 'utf8');
    return JSON.parse(data);
}

// Write to database
function writeDatabase(data) {
    fs.writeFileSync(DATABASE_FILE, JSON.stringify(data, null, 2));
}

// API Routes
// Get all submissions
app.get('/api/submissions', (req, res) => {
    const database = readDatabase();
    res.json(database.submissions);
});

// Get a specific submission
app.get('/api/submissions/:id', (req, res) => {
    const database = readDatabase();
    const id = parseInt(req.params.id);
    const submission = database.submissions.find(s => s.id === id);
    
    if (!submission) {
        return res.status(404).json({ error: 'Submission not found' });
    }
    
    res.json(submission);
});

// Create a new submission
app.post('/api/submissions', (req, res) => {
    const database = readDatabase();
    const submission = {
        id: Date.now(), // Use timestamp as ID
        ...req.body,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
    };
    
    database.submissions.push(submission);
    writeDatabase(database);
    
    res.status(201).json(submission);
});

// Clear all submissions
app.delete('/api/submissions/clear', (req, res) => {
    const database = readDatabase();
    database.submissions = [];
    writeDatabase(database);
    res.status(204).end();
});

// Update a submission
app.put('/api/submissions/:id', (req, res) => {
    const database = readDatabase();
    const id = parseInt(req.params.id);
    const submissionIndex = database.submissions.findIndex(s => s.id === id);
    
    if (submissionIndex === -1) {
        return res.status(404).json({ error: 'Submission not found' });
    }
    
    database.submissions[submissionIndex] = {
        ...database.submissions[submissionIndex],
        ...req.body
    };
    
    writeDatabase(database);
    res.json(database.submissions[submissionIndex]);
});

// Delete a submission
app.delete('/api/submissions/:id', (req, res) => {
    const database = readDatabase();
    const id = parseInt(req.params.id);
    const submissionIndex = database.submissions.findIndex(s => s.id === id);
    
    if (submissionIndex === -1) {
        return res.status(404).json({ error: 'Submission not found' });
    }
    
    database.submissions.splice(submissionIndex, 1);
    writeDatabase(database);
    res.status(204).end();
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 