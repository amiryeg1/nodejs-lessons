const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();

let { DB_HOST, DB_NAME } = process.env;
mongoose
  .connect(`mongodb://${DB_HOST}/${DB_NAME}`, {
    useMongoClient: true,
  })
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.error("could not connect to mongodb...", err));

require("./app/passport")(passport);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

let { SESSION_SECRET } = process.env;

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require("./app/routes.js")(app, passport);

let { HOST, PORT } = process.env;
app.listen(`${PORT}`);

console.log("server running on " + HOST + ":" + PORT);
