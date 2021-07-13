const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.port || 5000;
require("dotenv").config();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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
