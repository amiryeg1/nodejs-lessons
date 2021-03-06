//__________________________________module imports
const minioClient = require("./app/minioClient");
const app         = require("./app/app");
const mongoose    = require("mongoose");

//__________________________________check if bucket exists
async function bucketCheck() {
  try {
    // Create bucket if it doesn't exist.
    const found = await minioClient.bucketExists("l9-file-upload");
    if (found) {
      console.log("l9-file-upload already exists");
    } else {
      // Create bucket 'my-bucketname'.
      minioClient.makeBucket('l9-file-upload', 'us-east-1', function (err) {
        if (err) return console.log('Error creating bucket.', err)
        console.log('Bucket created successfully in "us-east-1".')
      })
    }
  } catch (e) {
    console.log("Error occurred: " + e);
  }
}
bucketCheck();

//__________________________________database connection
mongoose
  .connect("mongodb://localhost/l9-file-upload", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.error("could not connect to mongodb...", err));

//__________________________________server connection
var server = app.listen(3000, () => {
  var port = server.address().port;
  console.log(`server running on port ${port} successfully...`);
});