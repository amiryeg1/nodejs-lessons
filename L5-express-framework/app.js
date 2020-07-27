const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var names = {};
var id = 0;

app.get("/", (req, res) => {
  res.redirect(301, "/register");
});
app.get("/hello", (req, res) => {
  res.send("Hello Express");
});
app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/names", (req, res) => {
  const name = req.body.name;
  console.log({
    name: name,
  });
  id = id + 1;
  names[`${id}`] = name;
  console.log(names);
  res.send({ success: true });
});
app.get("/names", (req, res) => {
  res.json(names);
});

app.get("/names/:id", (req, res) => {
  const name = req.body.name;
  console.log({
    name: name,
  });
  res.json({
    name: names[req.params.id],
  });
});
app.delete("/names/:id", (req, res) => {
  const name = names.find((c) => c.id === (req.params.id));
  if (!name)
    res.status(404).send("the name with the given ID was not foud");

  const index = names.indexOF(name);
  names.spice(index, 1);
  res.send(name)
});

module.exports = app;
