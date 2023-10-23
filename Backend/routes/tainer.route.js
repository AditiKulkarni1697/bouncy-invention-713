const express = require("express");
const { UserModel, TrainerModel } = require("../models/user.model");
const { ClassesModel } = require("../models/class.model");
const {client} = require("../dataBase/redis");
const bcrypt = require("bcrypt");
const { sendEmail, getEmailForOtp } = require("../mailer/mailer");
const { tokenCreator } = require("../helper/tokenCreater");
const jwt = require("jsonwebtoken");
const trainerRouter = express.Router();

// trainerRouter.post("/otpverify", async (req, res) => {
//   try {
//     let userOtp = req.body.otp;
//     let user = req.body.user;
//     let correctOtp = await redisClient.get(user.email);

//     if (userOtp == correctOtp && correctOtp) {
//       bcrypt.hash(
//         user.password,
//         process.env.saltRound,
//         async function (err, hash) {
//           if (err) {
//             console.log(err);
//             return res.status(401).send({
//               message: "Something went wrong",
//               error: err,
//               isOk: false,
//             });
//           } else {
//             let trainer = new TrainerModel({ ...user, password: hash });
//             await trainer.save();
//             res
//               .status(200)
//               .send({ message: "Trainer Registered", trainer, isOk: !false });
//           }
//         }
//       );
//     } else if (!correctOtp)
//       return res
//         .status(400)
//         .send({ message: "Otp Expired! try again", isOk: false });
//     else return res.status(400).send({ message: "invalid otp", isOk: false });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(400)
//       .send({ message: "somethin went wrong", error: error, isOk: false });
//   }
// });

trainerRouter.post("/register", async (req, res) => {
  let { name,
    email,
    phone,
    city,
    password,
    gender } = req.body;
  try {
    if(name == "" || email == "") return res.status(401).send({ message: "Something went wrong", isOk: false });
    let trainer = await TrainerModel.find({ email });
    if (trainer.length !== 0) {
      return res
        .status(400)
        .send({ message: "trainer already registered", isOk: false });
    } else {
      bcrypt.hash(password, 8, async function (err, hash) {
        if (err) {
          console.log(err, otp);
          return res
            .status(401)
            .send({ message: "Something went wrong", error: err, isOk: false });
        }
        else {
          const trainer = new TrainerModel({ name, email, phone, city, password: hash, gender });
          await trainer.save();
          console.log(trainer);
          res
            .status(200)
            .send({ message: "Registered successfully", isOk: true });
        }
      })
    }

}
    catch(error){
        res.status(401).send({ message: "Something went wrong", isOk: false });
    }

});

trainerRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const trainer = await TrainerModel.find({ email: email });
    if (trainer.length == 0) {
      res
        .status(400)
        .send({ message: "Trainer not found, Kindly register", isOk: false });
    } else {
      let Trainer = trainer[0];
      bcrypt.compare(password, Trainer.password, async (err, result) => {
        if (result) {
          let tokenObj = tokenCreator(Trainer);

          return res.status(200).send({
            message: "Login successful",
            token: tokenObj.token,
            refresh_token: tokenObj.refresh_token,
            isOk: true,
            trainer: Trainer,
          });
        } else {
          console.log(err);
          res.status(401).send({ message: "Wrong Credientials", isOk: false });
        }
      });
    }

}catch(error){
    res.status(401).send({ message: "Wrong Credientials", isOk: false });
}
})


trainerRouter.get("/:trainerID", async (req, res) => {
  try {
    let id = req.params.trainerID;

    const trainer = await TrainerModel.findOne({ _id: id });

    if (trainer)
      return res.status(200).send({
        message: "Trainer details feteched successfully.",
        Trainer: trainer,
        isOk: true,
      });
    else
      return res
        .status(400)
        .send({ message: "something went wrong", isOk: false });
  } catch (error) {
    return res.status(400).send({
      message: "something went wrong",
      error: error.message,
      isOk: false,
    });
  }
});

// trainerRouter.get("/:trainerID", async (req, res) => {
//   try {
//     let id = req.params.trainerID;
//     const trainer = await TrainerModel.findOne({ _id: id });
//     if (trainer)
//       return res.status(200).send({
//         message: "Trainer details feteched successfully.",
//         Trainer: trainer,
//       });
//     else return res.status(400).send({ message: "something went wrong" });
//   } catch (error) {
//     return res
//       .status(400)
//       .send({ message: "something went wrong", error: error.message });
//   }
// });

trainerRouter.post("/createClass", async (req, res) => {
  // console.log(req.body);
  let Class = req.body;
  Class.Link = "https://us06web.zoom.us/j/99494885";

  try {
    let classes = new ClassesModel(Class);
    await classes.save();
    await TrainerModel.findByIdAndUpdate(
      { _id: Class.trainerID },
      { $push: { classes: classes._id } }
    );
    let trainer = await TrainerModel.findById(classes.trainerID);
    let classDetails = `<h1>Hello ${classes.trainerName}</h1>
        <h2>Here are your session details:-<h2> 
        <p>Class title : ${classes.title} <br>
            Class link : ${classes.Link} <br>
                    
            Class price : ${classes.price}<br>
            Class duration : ${classes.duration} minutes

        </p>`
        sendEmail(classes.trainerEmail, `New Session Info`, classDetails )
        return res.status(200).send({message:"Class created",Class : classes, isOk :true})
    }catch(error){
        console.log(error)
        return res.status(400).send({message:"Something went wrong",error:error, isOk : false})
    }
})



trainerRouter.patch("/updateClass/:classID", async (req, res) => {
  let classesID = req.params.classID;
  let payload = req.body;
  try {
    let classes = await ClassesModel.findByIdAndUpdate(classesID, payload);
    return res
      .status(200)
      .send({ message: "class data updated", Class: classes, isOk: true });
  } catch (error) {
    return res.status(400).send({
      message: "Something went wrong",
      error: error.message,
      isOk: false,
    });
  }
});

trainerRouter.patch("/updateClass/:classID", async (req, res) => {
  let classesID = req.params.classID;
  let payload = req.body;
  try {
    let classes = await ClassesModel.findByIdAndUpdate(classesID, payload);
    return res
      .status(200)
      .send({ message: "class data updated", Class: classes, isOk: true });
  } catch (error) {
    return res.status(400).send({
      message: "Something went wrong",
      error: error.message,
      isOk: false,
    });
  }
});

module.exports = { trainerRouter };
