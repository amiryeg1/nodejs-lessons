const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();

const AuthMiddleware = (req, res, next) => {
  token = req.header('Authorization')
  res.send()
  if(authenticated) {
    req.auth = tokenData = {userID: 2231};
    next();
  } else {
    return res.send('not Authenticated.')
  }
  
};

const encode = (inp, algorithm = "aes-256-ctr") => {
  let jm = JSON.stringify(inp);
  let key = Buffer.from("d0bc8fd4aae4548f8bee4a9eb714a3133e4e46a6f8d6ba220f432050fc4fef06", "hex");
  let iv = Buffer.from("b66a422ae4006d4c32ed04717479d00d", "hex");
  let cipher = bcrypto.createCipheriv(algorithm, key, iv);
  let crypted = cipher.update(jm, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

const decode = (inp, secret, algorithm = "aes-256-ctr") => {
  var decipher = bcrypto.createDecipher(algorithm, secret);
  var dec = decipher.update(inp, 'hex', 'utf8');
  dec += decipher.final('utf8');
  let decobj = {};
  try {
      decobj = JSON.parse(dec);
  }
  catch (err) {
  }
  return decobj;
}

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

app.get("/names", AuthMiddleware, (req, res) => {
  res.json(names);
});

app.get("/names/:id", AuthMiddlewar, (req, res) => {
  userId = req.auth.userId;
  const username = req.body.name;
  console.log({
    name: username,
  });
  res.json({
    name: names[req.params.id],
  });
});

module.exports = app;
