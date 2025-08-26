// server.js
const express = require('express');
const bodyParser = require('body-parser');

// Import your SMS route
const smsRoutes = require('./routes/sms');

const app = express(); // ← This was missing
app.use(bodyParser.json());
app.use('/sms', smsRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
app.post('/resetdb', (req, res) => {
    db.run("DELETE FROM patients", (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error clearing database");
        } else {
            console.log("All patient data cleared.");
            res.send("All patient data cleared.");
        }
    });
});