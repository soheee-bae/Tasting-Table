const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

dotenv.config();

// set up server

const app = express();

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`server started on port : ${PORT}`));

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));
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
app.use("/recipe", require("./routers/recipeRouter"));
app.use("/bookmark", require("./routers/bookmarkRouter"));
