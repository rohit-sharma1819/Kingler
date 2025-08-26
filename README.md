# 🦀 Kingler Voice Agent with SMS Verification

A Node.js + Express server integrating Twilio to:

✅ Perform HIPAA verification

📅 Schedule & verify patients

✉️ Send/receive SMS (Twilio) for verification

💾 Manage patients with SQLite database
------------------------------------------------------------------------------

## 📂 Project Structure
      ├── 📑 README.md # Project documentation
      ├── 📦 node_modules/ # Dependencies
      ├── 🚦 routes/ # Route handlers
           ├── 🗣️ call.js # Voice call logic
           ├── 🗓️ schedule.js # Appointment scheduling
           ├── ✉️ sms.js # SMS sending
           └── 🧩 verify.js # Patient verification
      ├── 🛠️ utils/ # Utility scripts
           └── 🧰 helpers.js # Helper functions
      ├── 👤 addPatients.js # Add sample patients
      ├── 🔗 db.js # SQLite DB connection
      ├── 📋 package-lock.json # Updates dependencies
      ├── 📝 package.json # Metadata & dependencies
      ├── 💾 patients.db # Database file
      ├── 🖥️ server.js # Main Express server
      ├── ☎️ twilio.js # Voice call sending
      └── 👀 viewPatients.js # View all patients

------------------------------------------------------------------------------

## 🚀 Setup & Installation

# 1. Clone this repository
git clone https://github.com/rohit-sharma1819/Kingler.git
cd  Kingler

# 2. Install dependencies
npm install

# 3. Create the .env file
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# 4. Start the server
node server.js
# Server runs at http://localhost:3000


------------------------------------------------------------------------------

🧪 API Endpoints

POST /sms/verify  → Verify patient via SMS

POST /resetdb    → Clear all patient data

GET /patients    → View patients (or use node viewPatients.js)

------------------------------------------------------------------------------

📊 Database Structure

Patients are stored in patients.db:

| Field   | Type        | Description    |
|---------|-------------|----------------|
| id      | INTEGER PK  | Patient ID     |
| name    | TEXT        | Patient name   |
| dob     | TEXT/DATE   | Date of birth  |
| phone   | TEXT        | Phone number   |

------------------------------------------------------------------------------

🛠 Utilities

node addPatients.js    → Add sample patient

node viewPatients.js   → View patients

------------------------------------------------------------------------------

⚠️ Security Notes

❌ Don't commit .env (Twilio credentials, phone numbers) to GitHub

❌ Don't expose /resetdb in production

✅ Use .gitignore to exclude patients.db, .env

------------------------------------------------------------------------------

