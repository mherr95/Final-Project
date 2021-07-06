const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const pool = require("./db");

//Middleware
app.use(express.json());
app.use(cors());

// Routes //

//get users//
app.get("/", (req, res) => {
  res.send("Hello World");
});

//create user//
app.post("/register", async (req, res) => {
  try {
    const { username } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password]
    );
    console.log(req.body);
    res.json(newUser);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log("Connected to Port 5000");
});
