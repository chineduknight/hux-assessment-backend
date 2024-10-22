import request from "supertest";
import { app, server } from "../index";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

let token: string;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI_TEST || "");
  }

  // Create a test user and generate a token
  const user = await User.create({
    name: "Test User",
    email: "testuser@example.com",
    password: "password123",
  });

  token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", {
    expiresIn: "1d",
  });
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
  server.close();
});

describe("Authentication Middleware", () => {
  it("should allow access to a protected route with a valid token", async () => {
    const res = await request(app)
      .get("/api/v1/protected-route") // This route is protected
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("should deny access to a protected route without a token", async () => {
    const res = await request(app).get("/api/v1/protected-route");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error", "Not authorized, token missing");
  });

  it("should deny access with an invalid token", async () => {
    const res = await request(app)
      .get("/api/v1/protected-route")
      .set("Authorization", "Bearer invalid token");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error", "Not authorized, token invalid");
  });
});
