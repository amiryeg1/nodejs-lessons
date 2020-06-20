[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
## Simple Http Server
a very simple example on how to create a server using HTTP built-in module that respond a string to the requested path.

localhost:3000 will respond Hello ${name.FirstName}

localhost:3000/last will respond Hello ${name.FirstName}

check the code below
```js
var http = require('http');
const url = require('url');
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
```
### Usage
open terminal and write
```
npm start
```
open your browser and go to

www.localhost:3000 and www.localhost:3000/last
