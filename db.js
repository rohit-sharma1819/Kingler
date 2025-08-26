const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./kingler.db');

// Create tables if they don’t exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        dob TEXT,
        phone TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id INTEGER,
        date TEXT,
        time TEXT,
        FOREIGN KEY(patient_id) REFERENCES patients(id)
    )`);
});

module.exports = db;
