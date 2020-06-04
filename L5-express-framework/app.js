const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found\ntry\n localhost:3000/hello\n localhost:3000/name");
    res.end();
})
app.get("/hello", (req, res) => {
    res.write("Hello Express");
    res.end();
});
app.get("/name", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post('/name', (req, res) => {
    const username = req.body.name;
    console.log({
        name: username
    });
    res.json({
        name: username
    });
    res.end();
});

app.listen(3000, () => {
    console.log(`server running on port 3000 successfully`);
});