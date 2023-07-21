const express = require('express')
const {PaymentModel} = require('../models/payment.model')
const paymentRouter = express.Router()

paymentRouter.get('/:userID', async(req, res)=>{
    try {
        let id =req.params?.userID
        let payments = PaymentModel.find({userID : userID})
        if(payments.length == 0) return res.status(400).send({message : 'no details'})
        return res.status(200).send({message : "cards details", payments : payments[0]})
    } catch (error) {
        return res.status(400).send({msg : "something went wrong", error : error})
    }
})

paymentRouter.post('/', async (req, res)=>{
    try {
        let payment = new PaymentModel(req.body)
        return res.status(200).send({message : "successfully recived Payment", payment})
    } catch (error) {
        return res.status(400).send({message : "Payment failed" , error})
    }
})