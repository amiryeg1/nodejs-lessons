const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
const names = {};
const id = 0;
app.get("/", (req, res) => {
    res.redirect(301, "/register")
})
app.get("/hello", (req, res) => {
    res.send("Hello Express");
});
app.get("/register", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post('/names', (req, res) => {
    const username = req.body.name;
    console.log({
        name: username
    });
    names[`${id+1}`] = username;
    console.log(names)
    res.end();
});
app.get('/names', (req, res) => {
    
    res.json(names);
});
app.get('/names/:id', (req, res) => {
    const username = req.body.name;
    console.log({
        name: username
    });
    res.json({
        name: names[req.params.id]
    })
    
});

var server = app.listen(3000, () => {
    var port = server.address().port
    console.log(`server running on port ${port} successfully`)
})