const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

// set up server

const app = express();

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`server started on port : ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// connect to mongodb
mongoose.connect(
  process.env.MDB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to mongodb");
  }
);

//set up routes
app.use("/auth", require("./routers/userRouter"));
app.use("/profile", require("./routers/profileRouter"));
app.use("/category", require("./routers/categoryRouter"));
