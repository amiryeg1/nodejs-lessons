const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost/authentication", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.error("could not connect to mongodb...", err));

const userSchema = new mongoose.Schema({
  Username: { type: String, unique: true },
  Password: String,
  FullName: String,
  Age: Number,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.redirect(301, "/home");
});

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/home.html");
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

  res.send("you signed up successfully");
});

app.get("/signup", function (req, res) {
  res.sendFile(__dirname + "/sign-up.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", async (req, res) => {
  let unhashedPassword = req.body.password;
  let person = await User.findOne({ Username: req.body.Username });
  if (!person) return res.status(400).send("invalid username or password");

  const validPassword = await bcrypt.compare(unhashedPassword, person.Password);
  if (!validPassword) {
    res.send("invalid name or password");
  } else {
    res.send(`${person.FullName} successfully logged in`);
  }
});

app.get("/names", async (req, res) => {
  const namesOfUsers = await User.find().select({ Username: 1 });
  console.log(namesOfUsers);
  res.json(namesOfUsers);
});

module.exports = app;
