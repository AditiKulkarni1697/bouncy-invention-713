const express = require("express");
const userRoute = express.Router();
const { redisClient } = require("../dataBase/redis");
const { UserModel, TrainerModel } = require("../models/user.model");
const { getEmailForOtp, sendEmail, getEmailForBookInfo, getOtpForUserInfo } = require("../mailer/mailer");
const { tokenCreator } = require("../helper/tokenCreater");
const { ClassesModel } = require("../models/class.model");

userRoute.post("/otpverify", async (req, res) => {
    try {
        let userOtp = req.body.otp;
        let correctOtp = await redisClient.get(req.body.user.email);

        if (userOtp == correctOtp && correctOtp) {
            const user = new UserModel(req.body.user);
            return res
                .status(200)
                .send({ message: "Registration successfull", newUser: user });
        } else if (!correctOtp)
            return res.status(400).send({ message: "Otp Expired! try again" });
        else return res.status(400).send({ message: "invalid otp" });
    } catch (error) {
        return res
            .status(400)
            .send({ message: "something went wrong", error: error });
    }
});

userRoute.get("/", async (req, res) => {
    try {
        let users = await UserModel.find();
        return res.status(200).send({ message: "User Data", users });
    } catch (error) {
        return res
            .status(400)
            .send({ message: "Something went wrong", error: error });
    }
});

userRoute.get("/:userID", async (req, res) => {
    let userID = req.params.userID;
    try {
        let user = await UserModel.findById(userID);
        if (user) return res.status(200).send({ message: "User Data", user });
        return res.status(400).send({ message: "User doesnot exists" });
    } catch (error) {
        return res
            .status(400)
            .send({ message: "Something went wrong", error: error });
    }
});

userRoute.post("/register", async (req, res) => {
    let { name, email } = req.body;
    try {
        let trainer = await TrainerModel.find({ email });
        if (trainer.length !== 0)
            return res.status(400).send({ message: "user already registered" });

        let user = await UserModel.find({ email });
        if (user.length !== 0) {
            return res.status(400).send({ message: "user already registered" });
        } else {
            let Email = getEmailForOtp(name);
            redisClient.setEx(email, 300, Email.otp + "");
            sendEmail(email, Email.otpSubject, Email.otpContent);
            return res
                .status(200)
                .send({ message: "otp send successfully to given email" });
        }
    } catch (error) {
        return res
            .status(400)
            .send({ error: error, message: "something went wrong" });
    }
});

userRoute.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).send({ error: "User not found", OK: false });
        } else {
            bcrypt.compare(password, user.password, async function (err, result) {
                if (result) {
                    let tokenObj = tokenCreator(user);

                    return res
                        .status(200)
                        .send({
                            message: "User Logged In ",
                            token: tokenObj.token,
                            refresh_token: tokenObj.refresh_token,
                            user,
                            OK: true,
                        });
                } else {
                    return res
                        .status(401)
                        .send({ error: "Wrong Credientials", OK: false });
                }
            });
        }
    } catch (error) {
        res
            .status(400)
            .send({ message: "Something went wrong", error: error, OK: false });
    }
});

userRoute.patch("/update/:id", async (req, res) => {
    let userID = req.params.id;
    let payload = req.body;
    try {
        let user = await UserModel.findByIdAndUpdate(userID, payload);
        return res.status(200).send({ message: "User data updated", user });
    } catch (error) {
        return res
            .status(400)
            .send({ message: "Something went wrong", error: error });
    }
});

userRoute.delete("/delete/:id", async (req, res) => {
    let userID = req.params.id;

    try {
        let user = await UserModel.findByIdAndDelete(userID);
        res.status(200).send({ message: "User data deleted" });
    } catch (error) {
        res
            .status(400)
            .send({ message: "Something went wrong", error: error.message });
        console.log(error);
    }
});

userRoute.get('/bookClass/:classID', async (req, res) => {
   let classID = req.params?.classID
   try {
    let Class = await ClassesModel.findById(classID)

    if(Class.seatOccupied == Class.seatTotal) {
        return res.status(400).send({message : "no seats avaible"})
    }

    let updatedClass = await ClassesModel.findByIdAndUpdate({_id : classID},{$push : {classes:Class._id}, seatOccupied : Class.seatOccupied +1});
    let trainer = await TrainerModel.findById(updatedClass.trainerID)
    let user = await UserModel.find({email})[0]
    let usermail   = getEmailForBookInfo({Class, user})
    let trainermail = getOtpForUserInfo({Class, user})
    
    sendEmail(user.email, usermail.otpSubject, usermail.otpContent)

    sendEmail (trainer.email, trainermail.otpSubject, trainermail.otpContent)

    return res.status(200).send({ message: "Class booked successfully" , ClassDetails : updatedClass});

} catch (error) {
    res
        .status(400)
        .send({ message: "Something went wrong", error: error });
}
})


module.exports = { userRoute };
