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
