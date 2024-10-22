import request from "supertest";
import { app } from "../index";
import { connectTestDB, disconnectTestDB } from "./utils/testSetup";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

let token: string;
let otherUserToken: string;

beforeAll(async () => {
  token = await connectTestDB();
  // Create a secondary user for non-owner access tests
  const otherUser = await User.create({
    name: "Other User",
    email: "otheruser@example.com",
    password: "password123",
  });

  otherUserToken = jwt.sign(
    { id: otherUser._id },
    process.env.JWT_SECRET || "",
    {
      expiresIn: "1d",
    }
  );
});

afterAll(async () => {
  await disconnectTestDB();
});

describe("Contact CRUD Operations", () => {
  let contactId: string;

  it("should create a new contact", async () => {
    const res = await request(app)
      .post("/api/v1/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
        email: "john.doe@example.com",
        type: "professional",
        address: "123 Main St, City, Country",
        notes: "Friend from the gym",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    contactId = res.body.data._id;
  });

  it("should not create a contact with missing fields", async () => {
    const res = await request(app)
      .post("/api/v1/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "John",
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toContain("Last name is required");
    expect(res.body.error).toContain("Phone number is required");
  });

  it("should not create a contact with an invalid email", async () => {
    const res = await request(app)
      .post("/api/v1/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "1234567890",
        email: "invalid-email",
        type: "professional",
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toContain("Please include a valid email");
  });

  it("should get all contacts", async () => {
    const res = await request(app)
      .get("/api/v1/contacts")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should not get a contact with invalid ID format", async () => {
    const res = await request(app)
      .get("/api/v1/contacts/invalid-id")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid contact ID");
  });

  it("should get a single contact", async () => {
    const res = await request(app)
      .get(`/api/v1/contacts/${contactId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.firstName).toBe("John");
    expect(res.body.data.email).toBe("john.doe@example.com");
  });
  it("should return 404 when contact ID does not exist", async () => {
    const nonExistentId = "507f1f77bcf86cd799439011";

    const res = await request(app)
      .get(`/api/v1/contacts/${nonExistentId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Contact not found");
  });

  it("should update a contact", async () => {
    const res = await request(app)
      .put(`/api/v1/contacts/${contactId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "Jane",
        notes: "Colleague at work",
      });

    expect(res.status).toBe(200);
    expect(res.body.data.firstName).toBe("Jane");
    expect(res.body.data.notes).toBe("Colleague at work");
  });

  it("should not update a contact with an invalid email", async () => {
    const res = await request(app)
      .put(`/api/v1/contacts/${contactId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "not-an-email",
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toContain("Please include a valid email");
  });
  it("should not update a contact if user is not the owner", async () => {
    const res = await request(app)
      .put(`/api/v1/contacts/${contactId}`)
      .set("Authorization", `Bearer ${otherUserToken}`)
      .send({
        firstName: "Unauthorized Update",
      });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty(
      "error",
      "Not authorized to access this contact"
    );
  });
  it("should not delete a contact if user is not the owner", async () => {
    const res = await request(app)
      .delete(`/api/v1/contacts/${contactId}`)
      .set("Authorization", `Bearer ${otherUserToken}`);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty(
      "error",
      "Not authorized to access this contact"
    );
  });
  it("should delete a contact", async () => {
    const res = await request(app)
      .delete(`/api/v1/contacts/${contactId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Contact deleted successfully");
  });

  it("should not delete a contact with an invalid ID", async () => {
    const res = await request(app)
      .delete("/api/v1/contacts/invalid-id")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid contact ID");
  });
});
