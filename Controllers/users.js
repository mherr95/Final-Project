const express = require("express");
const router = express.Router();

//import model from db.js
const pool = require("../db");

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

//create user//
router.post("/register", async (req, res) => {
  try {
    const { username } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password]
    );
    console.log(req.body);
    res.json(newUser.rows[0]);
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
