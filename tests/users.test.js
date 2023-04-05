const request = require("supertest");
const app = require("../app");
const { User } = require("../models/user");
const { default: mongoose } = require("mongoose");

const newUser = {
  email: "testjestexamplemail@testjest.pl",
  password: "password",
};

describe("Test the users routes", () => {
  let loginToken = "";
  let verifyTestToken = "";

  beforeAll(async () => {
    await User.findOneAndRemove({ email: newUser.email });
  });

  test("Test POST for users/signup without user data", async () => {
    const response = await request(app).post("/api/users/signup");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("Test POST for users/signup with user data", async () => {
    const response = await request(app).post("/api/users/signup").send(newUser);
    expect(response.statusCode).toBe(201);

    const { email, subscription, verifyToken } = response.body;

    expect(email).toBe(newUser.email);
    expect(subscription).toBe("starter");

    verifyTestToken = verifyToken;
  });

  test("Test POST for users/signup with existing user data", async () => {
    const response = await request(app).post("/api/users/signup").send(newUser);
    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe("Email in use");
  });

  test("Test POST for users/login without user data", async () => {
    const response = await request(app).post("/api/users/login");
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Email or password is missing");
  });

  test("Test POST for users/login with user data", async () => {
    const response = await request(app).post("/api/users/login").send(newUser);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");

    loginToken = response.body.token;
  });

  test("Test GET for users/current without token", async () => {
    const response = await request(app).get("/api/users/current");
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("No token, authorization denied");
  });

  test("Test GET for users/current with token", async () => {
    const response = await request(app)
      .get("/api/users/current")
      .set("Authorization", `${loginToken}`);
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("subscription");
  });

  test("Test PATCH for user subscription", async () => {
    const response = await request(app)
      .patch("/api/users")
      .set("Authorization", `${loginToken}`)
      .send({ subscription: "pro" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("subscription");
    expect(response.body.subscription).toBe("pro");
  });

  test("Test PATCH for user subscription with wrong data", async () => {
    const response = await request(app)
      .patch("/api/users")
      .set("Authorization", `${loginToken}`)
      .send({ subscription: "wrong" });
    expect(response.statusCode).toBe(400);
  });

  test("Test PATCH for user subscription without token", async () => {
    const response = await request(app).patch("/api/users").send({
      subscription: "pro",
    });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("No token, authorization denied");
  });

  test("Test GET for users/verify/:verificationToken with wrong token", async () => {
    const response = await request(app).get("/api/users/verify/wrongtoken");
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  test("Test GET for users/verify/:verificationToken", async () => {
    const response = await request(app).get(`/api/users/verify/${verifyTestToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Verification successful");
  });

  afterAll(async () => {
    await User.findOneAndRemove({ email: newUser.email });
    mongoose.connection.close();
    loginToken = "";
  });
});
