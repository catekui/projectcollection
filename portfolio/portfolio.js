const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter using SMTP
  let transporter = nodemailer.createTransport({
    host: "your_smtp_host",
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: "your_email@example.com",
      pass: "your_email_password"
    }
  });

  // Send email
  transporter.sendMail({
    from: '"Your Portfolio" <your_email@example.com>',
    to: "your_email@example.com",
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>`
  }, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Form submitted successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});