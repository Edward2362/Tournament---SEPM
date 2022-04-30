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

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("Welcome to the Tournament API");
});

// ? invitation
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/members", memberRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
