const express = require("express");
const nodemailer = require('nodemailer');
const passport = require('passport');
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const { classesRouter } = require("./routes/class.route");
const { userRoute } = require("./routes/user.route");
const { connection } = require("./dataBase/dataBase");
const { client } = require("./dataBase/redis");
const { trainerRouter } = require("./routes/tainer.route");
const { sendEmail } = require("./mailer/mailer");
const { paymentRouter } = require("./routes/payment.route");
const { UserModel } = require("./models/user.model");
require("./google_auth/google_auth")

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');


app.get("/", async (req, res) => {
  res.status(200).send({
    msg: "WEL_COME TO THE WORLD OF FITNESS",
  });
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login','profile', 'email']
}));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  async(req, res) => {
      // Successful login, redirect or respond as needed
      console.log(req.user,"req")
      try{
      let user = await UserModel.findOne({email:req.user})
      if(user){
        user = JSON.stringify(user)
        res.redirect(`https://65353573f393d2457b880e0e--peppy-cucurucho-3310dd.netlify.app/html/client.html?client=user&data=${user}`)
      }
      else{
        res.redirect("https://65353573f393d2457b880e0e--peppy-cucurucho-3310dd.netlify.app/html/signup.html")
      }
    }
    catch(err){
      console.log(err)
    }

  });

 




app.use("/user", userRoute);
app.use("/trainer", trainerRouter);
app.use("/classes", classesRouter);
app.use('/payment', paymentRouter)

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to the Database");
    console.log(
      `server is running on "http://localhost:${process.env.PORT}"`
    );
  } catch (error) {
    console.log(error);
  }
});
