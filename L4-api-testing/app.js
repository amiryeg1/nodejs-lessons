const http = require("http");
const server = http.createServer(function (req, res) {
    console.log("path", req.url);
    if (req.url == '/ping') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ data: 'pong' }));
    }
});
module.exports.start = () => {
    return new Promise((resolve, reject) => {
        server.listen(3000, "127.0.0.1", (err) => {
            if(err) {
                return resolve(err);
            }
            const { port, address } = server.address();
            console.log(`server running on port ${address} : ${port} successfully`)
            return resolve(server);
        });
    })

}

