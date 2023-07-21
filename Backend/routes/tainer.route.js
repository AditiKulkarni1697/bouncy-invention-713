const express = require ('express')
const { UserModel } = require('../models/user.model')
const { ClassesModel } = require('../models/class.model')

const trainerRouter = express.Router()

trainerRouter.get('/:trainerID', async (req, res)=>{
    try {
        let id  = req.params.trainerID
        const trainer = await UserModel.findOne({_id : id })
        if(trainer) return res.status(200).send({message : 'Trainer details feteched successfully.', Trainer : trainer})
        else return res.status(400).send({message : "something went wrong"})
    } catch (error) {
       return res.status(400).send({message : "something went wrong", error : error})
    }
})


trainerRouter.post("/createClass", async (req,res)=>{
    let Class = req.body;
    Class.seatOccupied=0;

    try{
        let classes = new ClassesModel(Class);
        await classes.save();
        await UserModel.findByIdAndUpdate({_id:Class.userID},{ $push: { classes: classes._id } });
        return res.status(200).send({message:"Class created",Class : classes})
    }catch(error){
        return res.status(400).send({message:"Something went wrong",error:error.message})
    }
})


trainerRouter.patch("/updateClass/:classID", async (req,res)=>{
    let classesID= req.params.classID;
    let payload = req.body;
    try{
        let classes = await ClassesModel.findByIdAndUpdate(classesID,payload);        
       return res.status(200).send({message:"class data updated", Class : classes})
    }catch(error){
        return res.status(400).send({message:"Something went wrong",error:error.message})
    }
})