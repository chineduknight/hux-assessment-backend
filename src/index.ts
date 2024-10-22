import express from "express";
import dotenv from "dotenv";
import "colors";
import { connectDB } from "./utils/db";
import { errorHandler } from "./middleware/errorHandler";
import router from "./routes";
import morgan from "morgan";

dotenv.config();

connectDB();

const app = express();
const PORT =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_PORT || 4001
    : process.env.PORT || 5000;

// add morgan middleware for logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  app.use(morgan("common"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/v1", router);

app.use(errorHandler); // Global error handler

const server = app.listen(PORT, () => {
  console.log(
    `⚡️[server]: Server running in ${process.env.NODE_ENV} mode on port ${PORT} visit http://localhost:${PORT}`
      .yellow.bold
  );
});
export { app, server }; // Export the app for testing
