import { login, signup } from "@controllers/userController";
import {
  validateSignup,
  validationHandler,
  validateLogin,
} from "@middleware/validators/userValidator";
import express from "express";

const router = express.Router();

router.post("/signup", validateSignup, validationHandler, signup);
router.post("/login", validateLogin, validationHandler, login);

export default router;
