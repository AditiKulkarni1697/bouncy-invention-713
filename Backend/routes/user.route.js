const express = require('express')
const userRoute = express.Router()


userRoute.get("/data", async(req, res)=>{
    const data = true
    console.log(data)
    if(data) res.send({
        // data : data,
        msg: "dfjsjf"
    })
})


module.exports= {userRoute}