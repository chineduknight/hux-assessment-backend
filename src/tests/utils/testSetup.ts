import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../../models/User";
import { server } from "../../index";

export const connectTestDB = async (): Promise<string> => {
  // Set environment to test mode
  process.env.NODE_ENV = "test";

  // Disconnect from any existing connections before establishing a test connection
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }

  const testUri = process.env.MONGO_URI_TEST;

  if (!testUri) {
    throw new Error("Test database URI is not defined");
  }

  await mongoose.connect(testUri);

  console.log("Connected to test database:", mongoose.connection.name);

  // Optionally return the token if required by tests
  const user = await User.create({
    name: "Test User",
    email: "testuser@example.com",
    password: "password123",
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", {
    expiresIn: "1d",
  });

  return token;
};

export const disconnectTestDB = async (): Promise<void> => {
  if (process.env.NODE_ENV === "test") {
    const dbName = mongoose.connection.name; // Get the name of the connected database
    console.log("Dropping test database:", dbName);

    if (dbName === "contact_keeper_test") {
      await mongoose.connection.dropDatabase();
    } else {
      console.warn(
        "Skipping dropDatabase: Connected to unexpected database",
        dbName
      );
    }

    await mongoose.connection.close();
    server.close();
  }
};
