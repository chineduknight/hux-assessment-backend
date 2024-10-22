import express from "express";

export const router = express.Router();

// Sample route
router.get("/", (req, res) => {
  res.send("User route placeholder");
});
