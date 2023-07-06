const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/sms-webhook', (req, res) => {
  const { from, to, body } = req.body; // Extract relevant information from the request body

  // Handle the incoming SMS message
  console.log(`Received SMS from: ${from}`);
  console.log(`Received SMS to: ${to}`);
  console.log(`Received SMS body: ${body}`);

  // Send a response to Sinch indicating the successful handling of the webhook
  res.status(200).end();
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});