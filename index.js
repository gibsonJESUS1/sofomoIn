const express = require("express");

const http = require("http");

const env = require("dotenv");

const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/auth");
const geolocationDetails = require("./routes/geolocation");
//environment variable
env.config();

const app = express();
const server = http.createServer(app);

//Database connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@tividale.dw0ng.mongodb.net/${process.env.MONGO_DB_DBNAME}?retryWrites=true&w=majority`,
    {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => {
    console.log({ error });
  })
  .then(() => {
    console.log("DATABASE CONNECTED");
  });
app.use(cors());

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", geolocationDetails);

// app.get("/add", function (request, response) {
//   var idAddress = request.socket.remoteAddress;
//   console.log(idAddress);
// });

server.listen(process.env.PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT${process.env.PORT}`);
});
