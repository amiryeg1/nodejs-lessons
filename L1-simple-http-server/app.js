var http = require('http');
const url = require('url');
var last = 'http://localhost:3080/last';
var q = url.parse(last, true);
  const server = http.createServer(function (req, res) {
    console.log("path", req.url);
    switch(req.url) {
      case "/":
        res.end(HelloF)
        break;
      case "/last":
        res.end(HelloL)
        break;
      default:
        res.end("Not Found")
    }
    //res.end(); 
  });


server.listen(3000)

const name = {
	FirstName : "Amir",
	LastName  :"Yeganeh"
};
const HelloF = `Hello ${name.FirstName}`;
const HelloL = `Hello ${name.LastName}`;