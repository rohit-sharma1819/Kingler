# Kingler Voice Agent with SMS Verification

This project is a Node.js + Express server that integrates with Twilio to:
- Perform HIPAA verification
- Schedule and verify patients
- Send and receive SMS for patient verification
- Manage patient database using SQLite

------------------------------------------------------------------------------

Project Root/
│
├── README.md           # Project documentation
├── package.json        # Metadata & dependencies
├── package-lock.json   # Locked dependencies
├── node_modules/       # Dependencies
├── patients.db         # SQLite database file
├── db.js               # Database connection
├── server.js           # Main Express server
│
├── routes/             # Route handlers
│
├── utils/              # Utility scripts
│   ├── helpers.js
│   ├── verify.js       # Patient verification
│   └── ...
│
├── scripts/
│   ├── addPatients.js  # Add sample patients
│   ├── viewPatients.js # View all patients
│   └── schedule.js     # Appointment scheduling
│
├── sms.js              # SMS sending
├── twilio.js           # Voice call sending
├── call.js             # Voice call logic


------------------------------------------------------------------------------

## 🚀 Setup & Installation

1. Clone this repository:
   
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>

2. Install dependencies:

npm install

3. Create a .env file in the root with:

TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

4. Start the server:

node server.js

Server will run at http://localhost:3000

------------------------------------------------------------------------------

🧪 API Endpoints

. POST /sms/verify → Verify patient via SMS

. POST /resetdb → Clear all patient data

. GET /patients → View all patients (or run node viewPatients.js)

------------------------------------------------------------------------------

📊 Database

Patients are stored in patients.db with fields:

id (Primary Key)

name

dob

phone

------------------------------------------------------------------------------

🛠 Utilities

node addPatients.js → Add a sample patient

node viewPatients.js → View all patients

------------------------------------------------------------------------------

⚠️ Security Notes

Dont commit .env (Twilio credentials, phone numbers) to GitHub

Dont expose /resetdb publicly

Use .gitignore to exclude patients.db and .env

------------------------------------------------------------------------------

# Node.js dependencies
node_modules/
npm-debug.log
yarn-error.log

# Environment variables
.env

# SQLite databases
*.db

# Logs
logs
*.log

# System files
.DS_Store
Thumbs.db


------------------------------------------------------------------------------

