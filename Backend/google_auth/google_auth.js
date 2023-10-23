const passport = require('passport');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()

passport.use(new GoogleStrategy({
    clientID: process.env.google_clinetID,
    clientSecret: process.env.google_clientSecret,
    callbackURL: 'https://fitme-2.onrender.com/auth/google/callback'
}, async(accessToken, refreshToken, profile, done) => {
    // Your verification and user creation logic here
    console.log(profile._json.email)

    return done(null, profile._json.email);
}));

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
