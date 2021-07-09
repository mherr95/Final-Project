const express = require("express");
const router = express.Router();

//import model from db.js
const pool = require("../db");

/////////// Routes ////////////

//get all appointments//
router.get("/appointments", async (req, res) => {
  try {
    const allAppointments = await pool.query("SELECT * FROM appointments");
    res.json(allAppointments.rows);
  } catch (err) {
    console.log(err);
  }
});

//get a specific appointment//
router.get("/appointments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await pool.query(
      "SELECT * from appointments WHERE appointment_id = $1",
      [id]
    );
    res.json(appointment.rows);
  } catch (err) {
    console.log(err);
  }
});

//create appointment//
router.post("/newAppointment", async (req, res) => {
  try {
    const { firstname } = req.body;
    const { lastname } = req.body;
    const { phone } = req.body;
    const { email } = req.body;
    const { date } = req.body;
    const { description } = req.body;
    const newAppointment = await pool.query(
      "INSERT INTO appointments (firstname, lastname, phone, email, date, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [firstname, lastname, phone, email, date, description]
    );
    console.log(req.body);
    res.json(newAppointment.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

//Update user//
router.put("/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname } = req.body;
    const { lastname } = req.body;
    const { phone } = req.body;
    const { email } = req.body;
    const { date } = req.body;
    const { description } = req.body;

    const updateAppointment = await pool.query(
      "UPDATE appointments SET firstname = $1, lastname = $2, phone = $3, email = $4, date = $5, description = $6 WHERE appointment_id = $7",
      [firstname, lastname, phone, email, date, description, id]
    );

    res.json("Appointment was updated");
  } catch (err) {
    console.log(err);
  }
});

//Delete user//
router.delete("/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteAppointment = await pool.query(
      "DELETE FROM appointments WHERE appointment_id = $1",
      [id]
    );
    res.json("Appointment was deleted");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
