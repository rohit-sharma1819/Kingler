const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { name, dob } = req.body;
  db.get('SELECT * FROM patients WHERE name = ? AND dob = ?', [name, dob], (err, row) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (row) res.json({ verified: true, patient_id: row.id });
    else res.json({ verified: false });
  });
});

module.exports = router;
