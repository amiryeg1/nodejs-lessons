const app = require("./app");
const request = require("supertest");

describe("GET : '/'", () => {
  it("should test statusCode", async (done) => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(301);
    done();
  });

  it("should redirect root path to '/home'", async (done) => {
    const response = await request(app)
      .get("/")
      .expect("Location", /\/home/);
    done();
  })
});

describe("GET : '/home' '/sign-up' '/login'", () => {
    it("/home should should render html file", async (done) => {
        const response = await request(app)
        .get("/home")
        .expect("Content-Type", /html/);
      done();
    });
    it("/signup should should render html file", async (done) => {
        const response = await request(app)
        .get("/signup")
        .expect("Content-Type", /html/);
      done();
    });
    it("/login should should render html file", async (done) => {
        const response = await request(app)
        .get("/login")
        .expect("Content-Type", /html/);
      done();
    });
describe("signUp", () => {
    it("POST /signup: should store new user to database", async (done) => {
        try {
        const data1 = ({
            Username: "someName",
            Password: "12345",
            FullName: "fullName",
            Age: 20,
          });
        const response = await request(app).post("/names").send(data1);
        const namesResult = await request(app).get("/names");
        expect(namesResult.body).toEqual({ 1: "amir" });
      done();
    }
     catch (err) {
            console.log(err);
          }
        });
  });
})