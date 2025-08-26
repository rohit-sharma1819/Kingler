const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;
const db = require('../db');

router.post('/incoming', (req, res) => {
    const twiml = new VoiceResponse();
    twiml.say("Hello! This is the automated patient verification system.");
    twiml.gather({ input: 'speech', action: '/call/verify-name', speechTimeout: 'auto' })
        .say("Please say your full name after the beep.");
    res.type('text/xml'); res.send(twiml.toString());
});

router.post('/verify-name', (req, res) => {
    const twiml = new VoiceResponse();
    const name = req.body.SpeechResult;
    db.get('SELECT * FROM patients WHERE name = ?', [name], (err, row) => {
        if(err || !row){ twiml.say("Sorry, we could not find your records. Goodbye."); twiml.hangup(); }
        else{
            twiml.gather({ input: 'speech', action: `/call/verify-dob?patient_id=${row.id}`, speechTimeout: 'auto' })
                .say("Please say your date of birth in MM-DD-YYYY format.");
        }
        res.type('text/xml'); res.send(twiml.toString());
    });
});

router.post('/verify-dob', (req, res) => {
    const twiml = new VoiceResponse();
    const patient_id = req.query.patient_id;
    const dob = req.body.SpeechResult;
    db.get('SELECT * FROM patients WHERE id = ? AND dob = ?', [patient_id, dob], (err,row) => {
        if(err || !row){ twiml.say("Verification failed. Goodbye."); twiml.hangup(); }
        else{
            twiml.gather({ input:'speech', action:`/call/schedule?patient_id=${patient_id}`, speechTimeout:'auto' })
                .say("Verification successful. Please say the date you want to schedule an appointment in MM-DD-YYYY format.");
        }
        res.type('text/xml'); res.send(twiml.toString());
    });
});

router.post('/schedule', (req, res) => {
    const twiml = new VoiceResponse();
    const patient_id = req.query.patient_id;
    const date = req.body.SpeechResult;
    twiml.gather({ input:'speech', action:`/call/confirm-time?patient_id=${patient_id}&date=${date}`, speechTimeout:'auto' })
        .say("Please say the time you want for your appointment in HH AM or HH PM format.");
    res.type('text/xml'); res.send(twiml.toString());
});

router.post('/confirm-time', (req, res) => {
    const twiml = new VoiceResponse();
    const patient_id = req.query.patient_id;
    const date = req.query.date;
    const time = req.body.SpeechResult;
    db.run('INSERT INTO appointments (patient_id, date, time) VALUES (?, ?, ?)', [patient_id, date, time], function(err){
        if(err){ twiml.say("Sorry, we could not schedule your appointment."); }
        else{ twiml.say(`Your appointment has been scheduled for ${date} at ${time}. Thank you!`); }
        twiml.hangup();
        res.type('text/xml'); res.send(twiml.toString());
    });
});

module.exports = router;
