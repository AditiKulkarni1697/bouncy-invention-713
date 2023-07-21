const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique : true},
    password:{type:String, required:true},
    phone:Number,
    city:{type:String, required:true},
    gender:{type:String, required:true},
    age:Number,
    height:Number,
    weight:Number,
    healthProblem:[{type:String}],
    classes:[{type:String}],
    cardDetails : {type:String}
})

const trainerSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique : true},
    password:{type:String, required:true},
    phone:Number,
    city:{type:String, required:true},
    gender:String,
    age:Number,
    classes:[{type:String}],
})

const UserModel = mongoose.model("user",userSchema);
const TrainerModel = mongoose.model("tainer",trainerSchema);

module.exports= {UserModel, TrainerModel};


