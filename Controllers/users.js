const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwt = require("jsonwebtoken");
const validInfo = require("../validInfo.js");
require("dotenv").config();

function jwtGenerator(user_id) {
  const payload = {
    user: user_id,
  };
  return jwt.sign(payload, process.env.SECRET, { expiresIn: 60 * 60 });
}

/////////// Routes ////////////

//get all users//
router.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT username,email FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.log(err);
  }
});

//get specific user//
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool.query(
      "SELECT username, email FROM users WHERE user_id = $1",
      [id]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("password or email inccorect");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    console.log(validPassword);
    if (!validPassword) {
      return res.status(401).json("password or email is inncorrect");
    }

    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.log(err);
  }
});

//create user//
router.post("/register", validInfo, async (req, res) => {
  try {
    const { username } = req.body;
    const { email } = req.body;
    const { password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exist");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, bcryptPassword]
    );

    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.log(err);
  }
});

//Update user//
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const { password } = req.body;
    const { username } = req.body;

    const updateUser = await pool.query(
      "UPDATE users SET password = $1, email = $2, username = $3 WHERE user_id = $4",
      [password, email, username, id]
    );

    res.json("User was updated");
  } catch (err) {
    console.log(err);
  }
});

//Delete user//
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await pool.query(
      "DELETE FROM users WHERE user_id = $1",
      [id]
    );
    res.json("User was deleted");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
