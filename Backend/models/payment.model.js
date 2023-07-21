const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
    userID : {type : String, required : true},
    classID : {type : String, required : true},
    cardDetails : {type : String}
}) 


const PaymentModel = mongoose.Model("payment", paymentSchema)

module.exports = {PaymentModel}