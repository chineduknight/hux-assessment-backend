import { login, signup } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";
import {
  validateSignup,
  validationHandler,
  validateLogin,
} from "../middleware/validators/userValidator";
import express from "express";

const router = express.Router();

router.post("/signup", validateSignup, validationHandler, signup);
router.post("/login", validateLogin, validationHandler, login);

// Example protected route to test middleware
router.get("/protected-route", protect, (req, res) => {
  res.status(200).json({ success: true, message: "Access granted" });
});
export default router;
