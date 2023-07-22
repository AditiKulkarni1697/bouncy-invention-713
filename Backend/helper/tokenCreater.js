const jwt = require('jsonwebtoken')
const {redisClient} = require ('../dataBase/redis')
require('dotenv').config()

async function tokenCreator(obj){
    let token = jwt.sign({ Client: obj._id, name:obj.name }, process.env.tokenSecretKey, { expiresIn:"1d"});

    let refresh_token = jwt.sign({ Client: obj._id,  name:obj.name}, process.env.refreshSecretKey, { expiresIn:"3d" });

    await redisClient.hSet('token', obj.email, token)
    await redisClient.hSet("refresh_token", obj.email, refresh_token)

    return {token, refresh_token}
}

module.exports = {tokenCreator}