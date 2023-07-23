const express = require('express')
const {PaymentModel} = require('../models/payment.model')
const paymentRouter = express.Router()

paymentRouter.get('/:userID', async(req, res)=>{
    try {
        let userID =req.params?.userID
        let payments = await PaymentModel.find({userID : userID})
        if(payments.length == 0) return res.status(400).send({message : 'no details', isOk : false})
        return res.status(200).send({message : "cards details", payments : payments[0], isOk:true})
    } catch (error) {
        return res.status(400).send({msg : "something went wrong", error : error, isOk : false})
    }
})

paymentRouter.post('/', async (req, res)=>{
    try {
        let payment = new PaymentModel(req.body)
        return res.status(200).send({message : "successfully recived Payment", payment, isOk : true})
    } catch (error) {
        return res.status(400).send({message : "Payment failed" , error, isOk : false})
    }
})


module.exports = {paymentRouter}