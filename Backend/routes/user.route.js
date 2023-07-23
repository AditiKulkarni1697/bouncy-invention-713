const express = require("express");
const userRoute = express.Router();
const { redisClient } = require("../dataBase/redis");
const { UserModel, TrainerModel } = require("../models/user.model");
const { getEmailForOtp, sendEmail, getEmailForBookInfo, getOtpForUserInfo } = require("../mailer/mailer");
const bcrypt = require('bcrypt')
const { tokenCreator } = require("../helper/tokenCreater");
const { ClassesModel } = require("../models/class.model");

userRoute.post("/otpverify", async (req, res) => {
    try {
        let userOtp = req.body.otp;
        let User = req.body.user
        let correctOtp = await redisClient.get(req.body.user.email);

        if (userOtp == correctOtp && correctOtp) {
            bcrypt.hash(User.password,  8, async function(err, hash) {
                if(err){
                    console.log(err,otp)
                    return res.status(401).send({message:"Something went wrong",error:err, isOk : false});
                }else{
                    const user = new UserModel({...User, password : hash});
                    await user.save()
                    console.log(user)
                    return res
                     .status(200)
                     .send({ message: "Registration successfull", newUser: user ,isOk : true});
                }
            })
            
        } else if (!correctOtp)
            return res.status(400).send({isOk : false, message: "Otp Expired! try again" });
        else return res.status(400).send({ message: "invalid otp" ,isOk : false});
    } catch (error) {
        return res
            .status(400)
            .send({ message: "something went wrong", error: error , isOk : false});
    }
});

userRoute.get("/", async (req, res) => {
    try {
        let users = await UserModel.find();
        return res.status(200).send({ message: "User Data", users,isOk : !false });
    } catch (error) {
        return res
            .status(400)
            .send({ message: "Something went wrong", error: error ,isOk : false});
    }
});

userRoute.get("/:userID", async (req, res) => {
    let userID = req.params.userID;
    try {
        let user = await UserModel.findById(userID);
        if (user) return res.status(200).send({ message: "User Data", user,isOk : !false });
        return res.status(400).send({ message: "User doesnot exists" ,isOk : false});
    } catch (error) {
        return res
            .status(400)
            .send({ message: "Something went wrong", error: error, isOk : false });
    }
});

userRoute.post("/register", async (req, res) => {
    let { name, email } = req.body;
    try {
        let user = await UserModel.find({ email });
        if (user.length !== 0) {
            return res.status(400).send({ message: "user already registered",isOk : false });
        } else {
            let Email = getEmailForOtp(name);
            redisClient.setEx(email, 300, Email.otp + "");
            sendEmail(email, Email.otpSubject, Email.otpContent);
            return res
                .status(200)
                .send({ message: "otp send successfully to given email", isOk : !false });
        }
    } catch (error) {
        return res
            .status(400)
            .send({ error: error, message: "something went wrong", isOk : false });
    }
});

userRoute.post("/login", async (req, res) => {
    let { email, password } = req.body;
    // console.log(req.body,'egsthegf')
    try {
        let user = await UserModel.find({ email });
        if (user.length == 0) {
            return res.status(400).send({ message :  "User not found", isOk: false });
        } else {
            bcrypt.compare(password, user[0].password, async function (err, result) {
                if (result) {
                    // console.log(user)
                    let tokenObj = tokenCreator(user[0]);
                    return res
                        .status(200)
                        .send({
                            message: "Login Successful ",
                            token: tokenObj.token,
                            refresh_token: tokenObj.refresh_token,
                            user : user[0],
                            isOk: true,
                        });
                } else {
                    return res
                        .status(401)
                        .send({ message:  "Wrong Credientials", isOk: false });
                }
            });
        }
    } catch (error) {
        res
            .status(400)
            .send({ message: "Something went wrong", error: error, isOk: false });
    }
});

userRoute.patch("/update/:id", async (req, res) => {
    let userID = req.params.id;
    let payload = req.body;
    try {
        let user = await UserModel.findByIdAndUpdate(userID, payload);
        return res.status(200).send({ message: "User data updated", user , isOk : true});
    } catch (error) {
        return res
            .status(400)
            .send({ message: "Something went wrong", error: error , isOk : false});
    }
});

userRoute.delete("/delete/:id", async (req, res) => {
    let userID = req.params.id;

    try {
        let user = await UserModel.findByIdAndDelete(userID);
        res.status(200).send({ message: "User data deleted" , isOk : true});
    } catch (error) {
        res
            .status(400)
            .send({ message: "Something went wrong", error: error.message, isOk: false });
        console.log(error);
    }
});

userRoute.post('/bookClass/:classID', async (req, res) => {
   let classID = req.params?.classID
    let user = req.body
   try {
    let Class = await ClassesModel.findById(classID)
    console.log(Class)
    if(Class.seatOccupied == Class.seatTotal) {
        return res.status(400).send({message : "no seats avaible" , isOk : false})
    }

    let updatedClass = await ClassesModel.findByIdAndUpdate({_id : classID},{$push : {classes:user._id}, seatOccupied : Class.seatOccupied +1});
    let trainer = await TrainerModel.findById(updatedClass.trainerID)
    let usermail   = getEmailForBookInfo({Class, user})
    let trainermail = getOtpForUserInfo({Class, user})
    
    sendEmail(user.email, usermail.otpSubject, usermail.otpContent)

    sendEmail (trainer.email, trainermail.otpSubject, trainermail.otpContent)

    return res.status(200).send({ message: "Class booked successfully" , ClassDetails : updatedClass, isOk :true});

} catch (error) {
    res
        .status(400)
        .send({ message: "Something went wrong", error: error, isOk: false });
}
})


module.exports = { userRoute };
