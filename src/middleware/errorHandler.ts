import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/ErrorResponse";

const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for developer
  if (process.env.NODE_ENV === "development") console.error(err);

  // Handle specific error cases if needed, e.g., MongoDB validation errors
  if (err.name === "CastError") {
    const message = `Resource not found with id ${err.message}`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export { errorHandler };
