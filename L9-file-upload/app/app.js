//__________________________________module imports
const minioClient = require("./minioClient");
const bodyParser  = require("body-parser");
const imgModel    = require("./models");
const express     = require("express");
const multer      = require("multer");
const morgan      = require("morgan");
const path        = require("path");
const cors        = require("cors");
const fs          = require('fs');

//__________________________________app configs
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false,}));
app.use(bodyParser.json({limit: "4mb",}));
app.use(morgan("dev"));
app.use(cors());

//__________________________________storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + "-" + Date.now());
  },
});
const upload = multer({
  storage: storage,
});

//__________________________________routes
app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../views/index.html"));
});

//__________________________________local storage
app.post("/local-storage1", upload.single("myFile"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("no file selected,\n please try again");
    res.send(error);
  }
  res.send(`file { ${file.originalname} } successfully uploaded`);
});

app.post("/local-storage2", upload.array("myFiles", 10), (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error("no file selected,\n please try again");
    res.send(error);
  }
  res.send(`${files.length} files successfully uploaded`);
});

//__________________________________server
app.post("/server1",multer({storage: multer.memoryStorage(),}).single("myFile"),(req, res) => {
    minioClient.putObject(
      "l9-file-upload",
      req.file.originalname + "-" + Date.now(),
      req.file.buffer,
      function (error, etag) {
        if (error) {
          return console.log(error);
        }
        console.log(req.file.filename);
        res.send(` file { ${req.file.originalname} } successfully uploaded`);
      }
    );
  }
);

app.get("/uploadList", async (req, res) => {
  var stream = await minioClient.listObjectsV2("l9-file-upload", "", true, "");
  stream.on("data", async function (obj) {
    console.table(obj);
  });
  stream.on("error", function (err) {
    console.log(err);
  });
  res.send("check your terminal to see uploaded files");
});

app.get("/download/:filename",(req, res) => {
  minioClient.fGetObject(
    "l9-file-upload",
    req.params.filename,
    path.join(__dirname, "../downloads/", req.params.filename),
    function (err) {
      if (err) {
        res.send(err);
        return console.log(err);
      }
      console.log("success");
      res.send(`file [ ${req.params.filename} ] successfully downloaded`);
    }
  );
});

//__________________________________database
app.post('/database', upload.single('myFile'), (req, res, next) => {
  var obj = {
    name: req.file.filename,
    img: {
      data: fs.readFileSync(path.join(__dirname, "../uploads/", req.file.filename)),
      contentType: 'image/png'
    }
  }
  imgModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      res.send(`${req.file.originalname} successfully uploaded`);
    }
  });
});

app.get('/databaseFiles', (req, res) => {
  imgModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred', err);
    } else {
      res.render('imagesPage', {
        items: items
      });
    }
  });
});

module.exports = app;