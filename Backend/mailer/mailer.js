const nodemailer = require('nodemailer');
require('dotenv').config()

async function sendEmail(email, subject, content) {
  try {
    
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user:  process.env.email,
        pass:  process.env.pass
     },
    }); 
    const mailOptions = {
      from: process.env.email,
      to: email,
      subject: subject,
      html: content,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}


function getEmailForOtp (name){
  otp = Math.floor(Math.random()*10000 + 99999)
  const email = {
    otp : otp,
    otpSubject :`OTP for registrating at Fit-Me`,
    otpContent :`<h2>Hey ${name} !</h2>
    <p>Your OTP for registering at Fit-Me is ${otp}.<br>Your OTP will expire within 5 min. <br> Please do not share your OTP with others <br></p>`
  }
  return email
}


function getEmailForBookInfo(obj){
  return {
    otpSubject : "Class Details From Fit-Me",
    otpContent : `<h2>Hey ${obj.user.name} !</h2>
    <p>Thank you for booking a fitness class with us.</p>
    <h2>Here are your Class details:-<h2> 
    <p><b>Class: </b>${obj.Class.title}<br>
    <b>Trainer: </b>${obj.Class.trainerName}<br>
    <b>Class Date: </b>${obj.Class.classDate}<br>
    <b>Class Time: </b>${obj.Class.classTime}<br>
    <b>Duration: </b>${obj.Class.duration}<br>
    <b>Amount Paid for session: </b>₹ ${obj.Class.price}<br>
    <b>Class Link: </b>${obj.Class.Link}</p>`
  }
}

function getOtpForUserInfo (obj) {
  return {
    otpSubject : "A new client booking info",
    otpContent : `<h2>Hey ${obj.Class.trainerName} !</h2>
    <h2>Here are your new client details:-<h2>

    <p>
    <b> Class Name : </b>${obj.Class.title} <br>
    <b>Name: </b>${obj.user.name}<br>
    <b>Email : </b>${obj.user.email}<br>
    <b>Amount Recieved for session: </b>₹ ${obj.Class.price}<br>
    </p>`
  }
}

module.exports = {sendEmail, getEmailForOtp, getEmailForBookInfo, getOtpForUserInfo}
