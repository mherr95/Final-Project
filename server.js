const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");

const PORT = process.env.port || 5000;

require("dotenv").config();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const usersController = require("./Controllers/users.js");
app.use(usersController);

const appointmentController = require("./Controllers/appointments");
app.use(appointmentController);

const authController = require("./Controllers/auth");
app.use("/auth", authController);

const sessionController = require("./Controllers/sessions");
app.use(sessionController);

app.listen(PORT, () => {
  console.log("Connected to Port 5000");
});
