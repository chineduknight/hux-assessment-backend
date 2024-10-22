import request from "supertest";
import { app } from "../index";
import { connectTestDB, disconnectTestDB } from "./utils/testSetup";

let token: string;

beforeAll(async () => {
  token = await connectTestDB();
});

afterAll(async () => {
  await disconnectTestDB();
});

describe("User Authentication", () => {
  it("should sign up a new user", async () => {
    const res = await request(app).post("/api/v1/users/signup").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should not sign up with existing email", async () => {
    await request(app).post("/api/v1/users/signup").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    const res = await request(app).post("/api/v1/users/signup").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "User already exists");
  });

  it("should log in an existing user", async () => {
    const res = await request(app).post("/api/v1/users/login").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not log in with wrong password", async () => {
    const res = await request(app).post("/api/v1/users/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid credentials");
  });
  it("should not login with empty fields", async () => {
    const res = await request(app).post("/api/v1/users/login").send({
      email: "",
      password: "",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toContain("Please include a valid email");
    expect(res.body.error).toContain("Password is required");
  });
  it("should not log in without required fields", async () => {
    const res = await request(app).post("/api/v1/users/login").send({
      email: "invalid-email",
      password: "",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toContain("Please include a valid email");
    expect(res.body.error).toContain("Password is required");
  });
});
