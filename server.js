const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whitelist = [
  "http://localhost:3000",
  "https://silly-beaver-62d637.netlify.app",
  "https://silly-beaver-62d637.netlify.app/appointments",
];
const corsOptions = {
  origin: whitelist,
};

app.use(cors(corsOptions));

const usersController = require("./Controllers/users.js");
const appointmentController = require("./Controllers/appointments");

app.use(usersController);
app.use(appointmentController);

app.get("/", (req, res) => {
  res.send("Server up");
});

app.listen(PORT, () => {
  console.log("Connected to Port:" + PORT);
});
