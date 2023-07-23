const express = require("express");
require('dotenv').config()
// const {UserModel} = require('../models/user.model')
const {ClassesModel} = require('../models/class.model')
const classesRouter = express.Router();


classesRouter.get("/", async (req,res)=>{
    try{
        let classes = await ClassesModel.find();
        return res.status(200).send({message:"Classes Data Feteched Successfully",classes, isOk : true})
    }catch(error){
        return res.status(400).send({message:"Something went wrong",error:error.message, isOk : false})
    }
})


classesRouter.get("/users/:userID", async (req,res)=>{
    let userID=req.params.userID
    try{
        let classes = await ClassesModel.find(({ users : { $in : userID }}));
        return res.status(200).send({message:"classes Data Fetched",classes, isOk: true})
    }catch(error){
        return res.status(400).send({message:"Something went wrong",error:error.message, isOk : false})
    }
})

classesRouter.get("/trainer/:trainerID", async (req,res)=>{
    let ID =req.params.trainerID
    try{
        let classes = await ClassesModel.find({trainerID:ID});
        return res.status(200).send({message:"All the Classes of trainer as feteched",classes, isOk: true})
    }catch(error){
        return res.status(400).send({message:"Something went wrong",error:error.message, isOk : false})
    }
})


classesRouter.get("/:classID", async (req,res)=>{
    let classID= req.params.classID;
    try{
        let classes = await ClassesModel.findById(classID);
        return res.status(200).send({message:"Class Feteched successfully.",classes, isOk : true})
    }catch(error){
        return res.status(400).send({message:"Something went wrong",error:error, isOk : false})
    }
})



classesRouter.delete("/delete/:classID", async (req,res)=>{
    let classID= req.params.classID;

    try{
        let classes = await ClassesModel.findByIdAndDelete(classID);        
        return res.status(200).send({message:"class data deleted", isOk:true})
    }catch(error){
        return res.status(400).send({message:"Something went wrong",error:error.message, isOk : false})
    }
})



module.exports= {classesRouter}

