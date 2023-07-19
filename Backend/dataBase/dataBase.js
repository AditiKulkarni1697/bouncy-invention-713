const mongoose=require('mongoose');
require('dotenv').config();

console.log(process.env.DataBaseUrl)
const connection=mongoose.connect(process.env.DataBaseUrl);

module.exports={
    connection
}