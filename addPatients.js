const db = require('./db');

db.run(`INSERT INTO patients (name, dob, phone) VALUES (?, ?, ?)`,
    ['Name', 'YYYY-MM-DD', '+YourPersonalNumber'], (err) => {
        if (err) console.log(err);
        else console.log('Patient added');
    });


db.close();
