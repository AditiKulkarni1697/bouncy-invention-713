# FitMe - Fitness App

<img src="https://64bd7d43624b4157fc66d549--snazzy-kleicha-a8dc9b.netlify.app/images/fitme.logo.png" />

### Team 
- Aditi Sujlegaonkar
- Prahlad Kushwah

  Netlify Link - https://splendorous-medovik-fa5d80.netlify.app/


FitMe is a web-based fitness application that allows trainers to create and manage fitness classes and enables clients to purchase and book these classes. The app is built using a combination of HTML, CSS, JS, Bootstrap for the frontend, and Express, MongoDB, JWT, and Nodemailer for the backend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Register and Login](#register-and-login)
- [Trainer Dashboard](#trainer-dashboard)
- [Client Dashboard](#client-dashboard)
- [Card Details](#card-details)
- [Security](#security)

## Features

- Trainers can register and create their profile.
- Clients can register and create their profile.
- Registration requires email verification using OTP.
- Trainers can create and manage fitness classes.
- Clients can view available classes and book them.
- Clients can purchase classes using their card details.
- Card details are securely saved for future use.
- Interactive and user-friendly interface.

## Tech Stack

The FitMe application utilizes the following technologies:

- Frontend:
  - HTML
  - CSS
  - JavaScript
  - Bootstrap

- Backend:
  - Express (Node.js framework)
  - MongoDB (Database)
  - JWT (JSON Web Tokens for authentication)
  - Nodemailer (Sending emails for verification)


## Register and Login

Both trainers and clients can register and log in to the FitMe application. Upon registration, an OTP (One-Time Password) will be generated and sent to the user's email for verification. This ensures a secure registration process.

## Trainer Dashboard

Trainers can access their personalized dashboard upon logging in. The dashboard provides the following functionalities:

- View and manage trainer details.
- Create and manage fitness classes.
- Update class schedules and capacities.
- View and track bookings by clients for each class.

## Client Dashboard

Clients will have their dashboard upon logging in. The client dashboard includes the following features:

- View and manage client profile details.
- Browse available fitness classes and their schedules.
- Book classes based on availability and capacity.
- Purchase classes using their card details.

## Card Details

For client convenience, FitMe securely stores card details for future class purchases. The app implements encryption and follows best practices to ensure the safety of this sensitive information.

## Security

FitMe takes security seriously and implements various measures to safeguard user data and prevent unauthorized access. These include:

- Hashing and salting of passwords for storage.
- Secure transmission of sensitive data using HTTPS.
- Protection against common web vulnerabilities (e.g., XSS, CSRF).
- Proper validation of user input to prevent potential exploits.

## Disclaimer

FitMe is a fictional fitness app created for demonstration purposes only. It does not handle real monetary transactions, and no real personal information is stored or used. As such, do not use real credentials or card information when testing the application.

If you encounter any issues or have suggestions for improvements, please feel free to contribute or report them on our GitHub repository.

Thank you for using FitMe! Stay fit and healthy! 💪🏋️‍♀️🥦
