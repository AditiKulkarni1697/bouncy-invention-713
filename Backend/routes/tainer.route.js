const express = require ('express')
const { UserModel, TrainerModel } = require('../models/user.model')
const { ClassesModel } = require('../models/class.model')
const {redisClient} = require('../dataBase/redis')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { sendEmail, getEmailForOtp } = require('../mailer/mailer')
const { tokenCreator } = require('../helper/tokenCreater')
const trainerRouter = express.Router()

trainerRouter.post('/otpverify', async (req, res)=>{
    try {
        let {name, email, password, phone, gender, city} = req.body.trainer;
        let userOtp = req.body.otp
        let correctOtp = await redisClient.get(email)

        if(userOtp == correctOtp && correctOtp){
            bcrypt.hash(password, + process.env.saltRound, async function(err, hash) {
                if(err){
                    res.status(401).send({message:"Something went wrong",error:err});
                    console.log(err)
                }else{
                    let trainer = new TrainerModel({name, email, password:hash, phone, gender, city});
                    await trainer.save();
                    res.status(200).send({message:"Trainer Registered",trainer})
                }
            }); 
        }
        else if(!correctOtp) return res.status(400).send({message : "Otp Expired! try again"})
        else  return res.status(400).send({message : "invalid otp"})
    } catch (error) {
        console.log(error)
        return res.status(400).send({message : "somethin went wrong", error : error})
    }
})

trainerRouter.post("/register", async (req,res)=>{
    let {name, email} = req.body;
    try{
        let trainer = await TrainerModel.find({email});
        if(trainer.length !== 0){
            return res.status(400).send({message:"trainer already registered"})
        }else{
            let Email = getEmailForOtp(name)
            redisClient.setEx(email, 300, Email.otp +"")
            sendEmail(email,Email.otpSubject, Email.otpContent )
            return res.status(200).send({message : "otp send successfully to given email"})
        }
    }catch(error){
        res.status(400).send({error:error, message : 'something went wrong'})
        console.log(error)
    }
})

trainerRouter.post('/login', async(req,res)=>{
    const {email, password} = req.body
    try {
        const trainer =  await TrainerModel.find({email : email})
        if(trainer.length == 0){
            res.status(400).send({message:"Trainer not found, Kindly register", "OK" :  false})
        }else{
            let Trainer = trainer[0]
            bcrypt.compare(password, Trainer.password, async (err, result)=> {
                if(result){
                    let tokenObj = tokenCreator(Trainer)

                    return res.status(200).send({message:"Login successfull",token : tokenObj.token, refresh_token : tokenObj.refresh_token, "OK": true})
                    
                }else{
                    console.log(err)
                    res.status(401).send({message:"Incorrect Password, Kindly Login Again", "OK": false});
                }
            });            
        }
    } catch (error) {
        res.status(400).send({message : 'someting went wrong', error : error})
    }
})

trainerRouter.get('/:trainerID', async (req, res)=>{
    try {
        let id  = req.params.trainerID
        const trainer = await TrainerModel.findOne({_id : id })
        if(trainer) return res.status(200).send({message : 'Trainer details feteched successfully.', Trainer : trainer})
        else return res.status(400).send({message : "something went wrong"})
    } catch (error) {
       return res.status(400).send({message : "something went wrong", error : error})
    }
})


trainerRouter.post("/createClass", async (req,res)=>{
    let Class = req.body;
    Class.seatOccupied=0;

    try{
        let classes = new ClassesModel(Class);
        await classes.save();
        await TrainerModel.findByIdAndUpdate({_id:Class.trainerID},{ $push: { classes: classes._id } });
        let trainer = await TrainerModel.findById(classes.trainerID)
        let classDetails = `<h1>Hello ${trainer.name}</h1>
        <h2>Here are your session details:-<h2> 
        <p>Class title : ${classes.title} <br>
            Class link : ${classes.Link} <br>
            Class price : ${classes.price}
        </p>`
        sendEmail(trainer.email, `New Session Info`, classDetails )
        return res.status(200).send({message:"Class created",Class : classes})
    }catch(error){
        return res.status(400).send({message:"Something went wrong",error:error.message})
    }
})


trainerRouter.patch("/updateClass/:classID", async (req,res)=>{
    let classesID= req.params.classID;
    let payload = req.body;
    try{
        let classes = await ClassesModel.findByIdAndUpdate(classesID,payload);        
       return res.status(200).send({message:"class data updated", Class : classes})
    }catch(error){
        return res.status(400).send({message:"Something went wrong",error:error.message})
    }
})

module.exports = {trainerRouter}
