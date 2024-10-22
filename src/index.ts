import express from "express";
import dotenv from "dotenv";
import "colors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(
    `⚡️[server]: Server running in ${process.env.NODE_ENV} mode on port ${PORT} visit http://localhost:${PORT}`
      .yellow.bold
  );
});