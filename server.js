const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.port || 5000;

//Middleware
app.use(cors());
app.use(express.json());

const usersController = require("./Controllers/users.js");
app.use(usersController);

const appointmentController = require("./Controllers/appointments");
app.use(appointmentController);

app.listen(PORT, () => {
  console.log("Connected to Port 5000");
});
