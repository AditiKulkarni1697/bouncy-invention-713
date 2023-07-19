const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique : true},
    password:{type:String, required:true},
    phone:Number,
    country:{type:String, required:true},
    gender:String,
    role:{type:String,enum:["trainer","client"],default:"client"},
    age:Number,
    height:Number,
    weight:Number,
    healthProblem:[{type:String}],
    classes:[{type:String}],
})

const UserModel = mongoose.model("user",userSchema);

module.exports={UserModel};


