const nodemailer = require('nodemailer');
require('dotenv').config()

async function sendEmail(otp,email) {
  try {
    
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user:  process.env.official_email,
        pass:  process.env.official_email_pass
     },
    });

    const mailOptions = {
      from: 'fitme0002@gmail.com',
      to: email,
      subject: "Heeolekfjds",
      html: '<h1> fuck you >>>>>  BOsdika</h1>',
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}


module.exports = {sendEmail}
