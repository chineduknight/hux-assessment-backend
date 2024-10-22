import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../utils/ErrorResponse";

// Validation rules for signup
export const validateSignup = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password must be at least 6 characters").isLength({
    min: 6,
  }),
];

// Validation rules for login
export const validateLogin = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").not().isEmpty(),
];

// Middleware to handle validation results
export const validationHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new ErrorResponse(
        errors
          .array()
          .map((err) => err.msg)
          .join(", "),
        400
      )
    );
  }
  next();
};
