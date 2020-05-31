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
      case "/video1":
       readvideo("vids/video 1.mp4")
        break;
      case "/video2":
          readvideo("vids/video 2.mp4")
        break;
      case "/video3":
          readvideo("vids/video 3.mp4")
        break;
      default:
        res.end("Not Found")
    }
  });
    server.listen(3000,()=>{
      console.log("server running on port 3000 successfully")
    })
  