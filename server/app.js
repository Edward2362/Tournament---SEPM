require("dotenv").config();
require("express-async-errors");

// express and database
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// middleware
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

// routers
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const projectRouter = require("./routes/projectRoute");
const memberRouter = require("./routes/memberRoute");

// not found and errors
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("Welcome to the Tournament API");
});

// ? invitation
app.use("/v1/auth", authRouter);
app.use("/v1/users", userRouter);
app.use("/v1/projects", projectRouter);
app.use("/v1/members", memberRouter);

app.use(notFound);
// TODO: handle status code
app.use(errorHandler);

// start server
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
