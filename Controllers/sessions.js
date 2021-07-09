const express = require("express");
const router = express.Router();

router.get("/create-session", (req, res) => {
  req.session.user = "mike";
  res.redirect("/users");
});

router.get("/retrieve-session", (req, res) => {
  console.log(req.session);
  if (req.session.user === "mike") {
    console.log("that user is mike");
  } else {
    console.log("thank god it is not someone else");
  }
  res.redirect("/users");
});

router.get("/update-session", (req, res) => {
  console.log(req.session);
  req.session.user = "Ta";
  console.log(req.session);
  res.redirect("/users");
});

router.get("/delete-session", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Something went wrong deleteing session");
    } else {
      console.log("session removed sucessfully");
    }
  });
  res.redirect("/users");
});

module.exports = router;
