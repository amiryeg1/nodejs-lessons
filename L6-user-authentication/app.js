const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var names = {};
var id = 0;

app.get("/", (req, res) => {
  res.redirect(301, "/signup");
});

app.post("/signup", async (req, res) => {
  let username = await req.body.name;
  var password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  hashedPassword = await bcrypt.hash(password, salt);
  id = id + 1;
  names[`${id}`] = { username, hashedPassword };

  console.log({
    name: username,
    password: hashedPassword,
  });

  res.send("you signed up successfully");
});

app.get("/signup", function (req, res) {
  res.sendFile(__dirname + "/sign-up.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", async (req, res) => {
  var unhashedPassword = req.body.password;
  console.log(unhashedPassword);
  const validPassword = await bcrypt.compare(unhashedPassword, hashedPassword);
  if (!validPassword) {
    res.send("invalid name or password");
  } else {
    res.send("login success");
  }
});

app.get("/names", (req, res) => {
  res.json(names);
});

app.get("/names/:id", (req, res) => {
  const username = req.body.name;
  console.log({
    name: username,
  });
  res.json({
    name: names[req.params.id],
  });
});

module.exports = app;
