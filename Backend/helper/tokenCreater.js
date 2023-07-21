const jwt = require('jsonwebtoken')
require('dotenv').config()

async function tokenCreator(obj){
    let token = jwt.sign({ Client: obj._id, name:obj.name }, process.env.tokenSecretKey, { expiresIn:"1d"});

    let refresh_token = jwt.sign({ Client: obj._id,  name:obj.name}, process.env.refreshSecretKey, { expiresIn:"3d" });

    await redisClient.hSet('token', Trainer.email, token)
    await redisClient.hSet("refresh_token", email, refresh_token)

    return {token, refresh_token}
}

module.exports = {tokenCreator}