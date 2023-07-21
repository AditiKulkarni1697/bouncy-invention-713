const nodemailer = require('nodemailer');
require('dotenv').config()

async function sendEmail(email, subject, content) {
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
      subject: subject,
      html: content,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}


function getEmailForOtp (obj){
  otp = Math.floor(Math.random()*10000 + 99999)
  const email = {
    otp : otp,
    otpContent :`<h2>Hey ${obj.name} !</h2>
    <p>Your OTP for registering at Fit-Me is ${otp}.<br>Your OTP will expire within 5 min. <br> Please do not share your OTP with others <br></p>`
  }

  return email
}

module.exports = {sendEmail, getEmailForOtp}
