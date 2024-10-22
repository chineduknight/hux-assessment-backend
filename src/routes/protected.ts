import { protect } from "../middleware/authMiddleware";
import express from "express";

const router = express.Router();

// Example protected route to test middleware
router.get("/protected-route", protect, (req, res) => {
  res.status(200).json({ success: true, message: "Access granted" });
});
export default router;
