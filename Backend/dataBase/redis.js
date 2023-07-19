const redis = require("redis")
require("dotenv").config();

const client = redis.createClient({
    password:process.env.redis_pass,
    socket: {
        host:process.env.redishost,
        port:process.env.redisport
    }
});

client.connect();

client.on("error", (error) => {
  console.log(error.message);
});
client.on("connect", () => {
  console.log("Connected to the redis cloud");
});
module.exports={client}