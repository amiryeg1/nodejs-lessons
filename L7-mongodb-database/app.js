const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userSchema = new mongoose.Schema({
  Username: { type: String, unique: true, required: true },
  Password: { type: String, required: true },
  FullName: { type: String, required: true },
  Age: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.redirect(301, "/home");
});

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
});

app.post("/signup", async (req, res) => {
  let username = await req.body.Username;
  let password = req.body.password;
  let fullName = req.body.FullName;
  let age = req.body.Age;
  const salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    Username: username,
    Password: hashedPassword,
    FullName: fullName,
    Age: age,
  });
  const result = await user.save();
  console.log(result);
  let token = jwt.sign(
    {
      _id: user._id,
      username: user.Username,
    },
    config.get("jwtPrivateKey")
  );
  res.header("x-auth-token", token).send("you signed up successfully");
});

app.get("/signup", function (req, res) {
  res.sendFile(__dirname + "/views/sign-up.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.post("/login", async (req, res) => {
  let unhashedPassword = req.body.password;
  let user = await User.findOne({ Username: req.body.Username });
  if (!user) return res.status(400).send("invalid username or password");

  const validPassword = await bcrypt.compare(unhashedPassword, user.Password);
  if (!validPassword) {
    res.send("invalid name or password");
  } else {
    let token = jwt.sign(
      {
        _id: user._id,
        username: user.Username,
      },
      config.get("jwtPrivateKey")
    );
    console.log(token);
    res.send(`${user.FullName} successfully logged in`);
  }
});

app.get("/names", async (req, res) => {
  const namesOfUsers = await User.find().select({ Username: 1 });
  console.log(namesOfUsers);
  res.json(namesOfUsers);
});

module.exports = app;
