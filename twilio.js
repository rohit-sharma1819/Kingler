const twilio = require('twilio');
const client = new twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

client.calls.create({
  url: 'YOUR_URL',
  to: '+XXXXXXXXXX',       // Patient phone number
  from: '+XXXXXXXXX'     // Your Twilio number
}).then(call => console.log(call.sid));
