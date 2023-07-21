const express = require('express')
const userRoute = express.Router()
const {redisClient} = require('../dataBase/redis')
const { UserModel } = require('../models/user.model')
const { getEmailForOtp, sendEmail} = require('../mailer/mailer')

userRoute.get('/register', async(req, res)=>{
    res.send({message :"emailsent success fully"})
})

userRoute.post('/otpverify', async (req, res)=>{
    try {
        let userOtp = req.body.otp
        let correctOtp = await redisClient.get(req.body.user.email)

        if(userOtp == correctOtp && correctOtp){
            const user  = new UserModel(req.body.user)
            return res.status(200).send({message :'Registration successfull', newUser  : user})
        }
        else if(!correctOtp) return res.status(400).send({message : "Otp Expired! try again"})
        else  return res.status(400).send({message : "invalid otp"})
    } catch (error) {
        return res.status(400).send({message : "somethin went wrong", error : error})
    }
})


module.exports= {userRoute}