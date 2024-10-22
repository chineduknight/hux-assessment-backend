import express from "express";
import dotenv from "dotenv";
import { router as userRoutes } from "./routes/userRoutes";
import "colors";
import { connectDB } from "./utils/db";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Mount routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(
    `⚡️[server]: Server running in ${process.env.NODE_ENV} mode on port ${PORT} visit http://localhost:${PORT}`
      .yellow.bold
  );
});
