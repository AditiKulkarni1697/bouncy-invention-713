const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
    userID : {type : String, required : true},
    classID : {type : String, required : true},
    cardDetails : {type : String, required : true}
}) 


const PaymentModel = mongoose.model("payment", paymentSchema)

module.exports = {PaymentModel}