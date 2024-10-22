import express from "express";
import dotenv from "dotenv";
import "colors";
import { connectDB } from "./utils/db";
import { errorHandler } from "./middleware/errorHandler";
import router from "./routes";
import morgan from "morgan";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { Request, Response } from "express";

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

// Body parser middleware
app.use(express.json());

// Security: Set various HTTP headers
app.use(helmet());

// Security: Prevent HTTP Parameter Pollution
app.use(hpp());

// Security: Rate limiting to prevent DoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

const whitelist = [process.env.REACT_APP_URL];

// CORS: Allow any origin from localhost for development purposes
app.use(
  cors({
    origin: (origin, callback) => {
      if (origin?.includes("localhost") || !origin) {
        callback(null, true);
      } else if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Knight Contact keeper backend!!");
});

app.use("/api/v1", router);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ data: "Route not found" });
});

app.use(errorHandler); // Global error handler

const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "test")
    console.log(
      `⚡️[server]: Server running in ${process.env.NODE_ENV} mode on port ${PORT} visit http://localhost:${PORT}`
        .yellow.bold
    );
});
export { app, server }; // Export the app for testing
