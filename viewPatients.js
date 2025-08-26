const db = require('./db');

db.all("SELECT * FROM patients", [], (err, rows) => {
    if(err) console.log(err);
    else console.log(rows);
});
db.close();
