const mongoose = require("mongoose");

const classesSchema = mongoose.Schema({
    title:{type:String,required:true},
    seatTotal:Number,
    seatOccupied:Number,
    price:Number,
    activity:{type:String,required:true},
    venue:{type:String},
    Link:String,
    duration:String,
    image:String,
    trainerID:{type:String,required:true},   
    trainerName:String,   
    classDate:String,
    classTime:String,             
    clients:[{type:String}]
})

const ClassesModel = mongoose.model("class",classesSchema);

module.exports={ClassesModel};