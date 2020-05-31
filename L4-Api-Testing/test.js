const superagent = require('superagent');
const server = require("./app");


(async () => {
  try {
    const app = await server.start();
    let {port, address} = app.address();
    const res = await superagent.post(address + ":" +port + "/ping");
    console.log(res);
    superagent
      .get("localhost:3000/ping")
      .send({ data: "pong" })
      .set('accept', 'json')
      .end((err, res) => {
        if (err) {
          return console.log(err);
        }
        console.log(res.data);
      });
 
  }
  catch (err) {
    console.error(err);
  }
})();
