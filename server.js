const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.port || 5000;

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const usersController = require("./Controllers/users.js");
app.use(usersController);

const appointmentController = require("./Controllers/appointments");
app.use(appointmentController);

const authController = require("./Controllers/auth");
app.use(authController);

app.listen(PORT, () => {
  console.log("Connected to Port 5000");
});
