const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  host: "localhost",
  password: "",
  port: 6379,
});

redisClient.connect(); //temperory changes


redisClient.on("error", (error) => {
  console.log(error.message);
});
redisClient.on("connect", () => {
  console.log("Connected to the redis cloud");
});
module.exports = { redisClient };
