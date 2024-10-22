import { check, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../utils/ErrorResponse";

// Validation rules for creating or updating a contact
export const validateContactFields = [
  check("firstName", "First name is required").not().isEmpty(),
  check("lastName", "Last name is required").not().isEmpty(),
  check("phoneNumber", "Phone number is required").not().isEmpty(),
  check("email", "Please include a valid email").optional().isEmail(),
  check("type", "Type must be either personal or professional")
    .optional()
    .isIn(["personal", "professional"]),
];

export const validateUpdateContactFields = [
  check("firstName", "First name must not be empty").optional().not().isEmpty(),
  check("lastName", "Last name must not be empty").optional().not().isEmpty(),
  check("phoneNumber", "Phone number must not be empty")
    .optional()
    .not()
    .isEmpty(),
  check("email", "Please include a valid email").optional().isEmail(),
  check("type", "Type must be either personal or professional")
    .optional()
    .isIn(["personal", "professional"]),
];
// Validation for contact ID
export const validateContactId = [
  param("id", "Invalid contact ID").isMongoId(),
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
