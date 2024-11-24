const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Example route
app.get('/', (req, res) => {
    res.send('Welcome to Learnly!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});