require("dotenv").config();
require("express-async-errors");

// express and database
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// middleware
const cookieParser = require("cookie-parser");

// routers
const authRouter = require("./routes/authRoute");

// not found and errors
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("Welcome to the Tournament API");
});

app.use("/api/v1/auth", authRouter);

app.use(notFound);
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
