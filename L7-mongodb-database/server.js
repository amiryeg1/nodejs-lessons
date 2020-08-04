const app = require("./app");
var server = app.listen(3000, () => {
  var port = server.address().port;
  console.log(`server running on port ${port} successfully...`);
});
