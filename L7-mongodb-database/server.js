const app = require("./app");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/authentication", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.error("could not connect to mongodb...", err));

var server = app.listen(3000, () => {
  var port = server.address().port;
  console.log(`server running on port ${port} successfully...`);
});
