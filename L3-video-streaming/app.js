var http = require('http');
const url = require('url');
const fs = require('fs');
console.log("server running on port 3000")
const server = http.createServer(function (req, res) {
    console.log("path", req.url);
    switch(req.url) {
      case "/":
        res.writeHead(200,{"Content-Type":"text/html"});
        var rs = fs.createReadStream(__dirname + "/index.html","utf8");
        rs.pipe(res);
        break;
      case "/vid1":
        res.writeHead(200, {'Content-Type': 'video/mp4'});
        rs = fs.ReadStream("vids/vid 1.mp4")
        rs.pipe(res);
        break;
        case "/vid2":
        res.writeHead(200, {'Content-Type': 'video/mp4'});
        rs = fs.ReadStream("vids/vid 2.mp4")
        rs.pipe(res);
        break;
        case "/vid3":
        res.writeHead(200, {'Content-Type': 'video/mp4'});
        rs = fs.ReadStream("vids/vid 3.mp4")
        rs.pipe(res);
        break;
      default:
        res.end("Not Found")
    }

  });
    server.listen(3000)