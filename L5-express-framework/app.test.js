const app = require("./app");
const request = require("supertest");

describe("GET : '/' '/hello' '/register'", () => {
  it("should test statusCode", async (done) => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(301);
    done();
  });

  it("should redirect root path to '/register'", async (done) => {
    const response = await request(app)
      .get("/")
      .expect("Location", /\/register/);
    done();
  });

  it("should return Hello Express", async (done) => {
    const response = await request(app)
      .get("/hello")
      .expect(200)
      .expect(/Hello Express/);
    done();
  });

  it("should render html file", async (done) => {
    const response = await request(app)
      .get("/register")
      .expect("Content-Type", /html/);
    done();
  });
});

describe("Names", () => {
  it("POST /names: should insert new name to server", async (done) => {
    try {
      const data1 = { name: "amir" };
      const response = await request(app).post("/names").send(data1);
      const namesResult = await request(app).get("/names");
      expect(namesResult.body).toEqual({ 1: "amir" });
      done();
    } catch (err) {
      console.log(err);
    }
  });

  it("GET /names:id: should return username.", async (done) => {
    try {
      const data2 = { name: "saeid" };
      const response = await request(app).post("/names").send(data2);
      const namesResult = await request(app).get("/names/2");
      expect(namesResult.body).toEqual(data2);
      done();
    } catch (err) {
      console.log(err);
    }
  });

  it("GET /names: should return names object.", async (done) => {
    try {
      const namesResult = await request(app).get("/names");
      expect(namesResult.body).toEqual({ "1": "amir", "2": "saeid" });
      done();
    } catch (err) {
      console.log(err);
    }
  });
});
/*
  it('DELETE /names:id: should remove name with it\'s id .', async (done) => {
    try {
      const data = { name: 'amir' };
      const response = await request(app).post('/names').send(data);
      const namesResult = await request(app).get('/names');
      expect(namesResult.body).toEqual({ 1: 'amir' });
      done();
    } catch (err) {
      console.log(err)
    }
  })
});
*/
