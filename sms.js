const express = require('express');
const router = express.Router();
const db = require('../db');
const twilio = require('twilio');

const client = new twilio('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'YOUR_AUTH_TOKEN');

// Step 1: Verify patient
router.post('/verify', (req, res) => {
    const { name, dob, phone } = req.body;

    db.get('SELECT * FROM patients WHERE name = ? AND dob = ? AND phone = ?', [name, dob, phone], (err, row) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        if (row) {
            res.json({ verified: true, patient_id: row.id });
            // Send SMS confirmation of verification
            client.messages.create({
                body: `Hello ${name}, your identity has been verified. You can now schedule an appointment.`,
                from: '+YourTwilioNumber',
                to: phone
            });
        } else {
            res.json({ verified: false });
            client.messages.create({
                body: `Sorry, we could not verify your identity. Please check your details.`,
                from: '+YourTwilioNumber',
                to: phone
            });
        }
    });
});

// Step 2: Schedule appointment
router.post('/schedule', (req, res) => {
    const { patient_id, date, time, phone } = req.body;

    db.run('INSERT INTO appointments (patient_id, date, time) VALUES (?, ?, ?)', [patient_id, date, time], function(err){
        if(err){
            res.status(500).json({ success: false });
            client.messages.create({
                body: `Sorry, we could not schedule your appointment. Try again later.`,
                from: '+YourTwilioNumber',
                to: phone
            });
        } else {
            res.json({ success: true, appointment_id: this.lastID });
            client.messages.create({
                body: `Your appointment has been scheduled for ${date} at ${time}.`,
                from: '+YourTwilioNumber',
                to: phone
            });
        }
    });
});

module.exports = router;
