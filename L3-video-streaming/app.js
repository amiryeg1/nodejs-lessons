var http = require('http');
const url = require('url');
const fs = require('fs');
const server = http.createServer(function (req, res) {
  function readvideo(vid){
    res.writeHead(200, {'Content-Type': 'video/mp4'});
    rs = fs.ReadStream(vid);
    rs.pipe(res);
  }
    console.log("path", req.url);
    switch(req.url) {
      case "/":
        res.writeHead(200,{"Content-Type":"text/html"});
        var rs = fs.ReadStream(__dirname + "/index.html","utf8");
        rs.pipe(res);
        break;
      case "/vid1":
       readvideo("vids/vid 1.mp4")
        break;
      case "/vid2":
          readvideo("vids/vid 2.mp4")
        break;
      case "/vid3":
          readvideo("vids/vid 3.mp4")
        break;
      default:
        res.end("Not Found")
    }
  });
    server.listen(3000,()=>{
      console.log("server running on port 3000 successfully")
    })
  