const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { patient_id, date, time } = req.body;
  db.run('INSERT INTO appointments (patient_id, date, time) VALUES (?, ?, ?)', [patient_id, date, time], function(err){
    if(err) return res.status(500).json({ message: 'Database error' });
    res.json({ success: true, appointment_id: this.lastID });
  });
});

module.exports = router;
