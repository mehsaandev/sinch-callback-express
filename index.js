const express = require('express');
const bodyParser = require('body-parser');
const nodemailer  =  require("nodemailer");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/sms-webhook', (req, res) => {
  const { from, to, body } = req.body; // Extract relevant information from the request body

  // Handle the incoming SMS message
  console.log(`Received SMS from: ${from}`);
  console.log(`Received SMS to: ${to}`);
  console.log(`Received SMS body: ${body}`);


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ehsaan2611@gmail.com",
      pass: "zdbaivgcntkjlygu",
    },
  });

  const mailOptions = {
    from: "ehsaan2611@gmail.com",
    to: 'ehsaan2611@gmail.com',
    subject: "Sinch Testing",
    html: `Hi \n
    From : ${from}\n
    To: ${to}\n
    Body: ${body}\n
    `,
  };


  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(200).json({ message: "Email sending failed" });

    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ response: "Email sent Successfully" });
    }
  });











  // Send a response to Sinch indicating the successful handling of the webhook
  res.status(200).end();
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});