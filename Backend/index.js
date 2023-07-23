const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { classesRouter } = require("./routes/class.route");
const { userRoute } = require("./routes/user.route");
const { connection } = require("./dataBase/dataBase");
const { redisClient } = require("./dataBase/redis");
const { trainerRouter } = require("./routes/tainer.route");
const { sendEmail } = require("./mailer/mailer");
const { paymentRouter } = require("./routes/payment.route");

const app = express();
app.use(express.json());
app.use(cors());


app.get("/", async (req, res) => {
  res.status(200).send({
    msg: "WEL_COME TO THE WORLD OF FITNESS",
  });
});

app.use("/user", userRoute);
app.use("/trainer", trainerRouter);
app.use("/classes", classesRouter);
app.use('/payment', paymentRouter)

app.listen(process.env.server_port, async () => {
  try {
    await connection;
    console.log("connected to the Database");
    console.log(
      `server is running on "http://localhost:${process.env.server_port}"`
    );
  } catch (error) {
    console.log(error);
  }
});
