const express = require("express");
require('dotenv').config()
// const {UserModel} = require('../models/user.model')
const {ClassesModel} = require('../models/class.model')
const classesRouter = express.Router();


classesRouter.get("/", async (req,res)=>{
    try{
        let classes = await ClassesModel.find();
        return res.status(200).send({message:"Classes Data Feteched Successfully",classes})
    }catch(error){
        return res.status(400).send({message:"Something went wrong",error:error.message})
    }
})


classesRouter.get("/users/:userID", async (req,res)=>{
    let userID=req.params.userID
    try{
        let classes = await ClassesModel.find(({ clients : { $in : userID }}));
        return res.status(200).send({message:"classes Data Fetched",classes})
    }catch(error){
        return res.status(400).send({message:"Something went wrong",error:error.message})
    }
})

classesRouter.get("/trainer/:trainerID", async (req,res)=>{
    let ID =req.params.trainerID
    try{
        let classes = await ClassesModel.find({trainerID:ID});
        return res.status(200).send({message:"All the Classes of trainer as feteched",classes})
    }catch(error){
        return res.status(400).send({message:"Something went wrong",error:error.message})
    }
})


classesRouter.get("/:classID", async (req,res)=>{
    let classID= req.params.classID;
    try{
        let classes = await ClassesModel.findById(classID);
        return res.status(200).send({message:"Class Feteched successfully.",classes})
    }catch(error){
        return res.status(400).send({message:"Something went wrong",error:error.message})
    }
})



classesRouter.delete("/delete/:classID", async (req,res)=>{
    let classID= req.params.classID;

    try{
        let classes = await ClassesModel.findByIdAndDelete(classID);        
        return res.status(200).send({message:"class data deleted"})
    }catch(error){
        return res.status(400).send({message:"Something went wrong",error:error.message})
    }
})


// classesRouter.patch("/updateTest", async (req,res)=>{
//     try{
//         let classes = await ClassesModel.updateMany({venue:"online"},{locationOrLink:"https://us06web.zoom.us/j/9314210793"});        
//         res.status(200).send({message:"class data updated"})
//     }catch(error){
//         res.status(400).send({message:"Something went wrong",error:error.message})
//     }
// })


module.exports= {classesRouter}

