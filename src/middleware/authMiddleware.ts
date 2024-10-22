/// <reference path="../@types/express/index.d.ts" />

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { ErrorResponse } from "../utils/ErrorResponse";

interface Decoded {
  id: string;
  iat: number;
  exp: number;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized, token missing", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as Decoded;

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return next(new ErrorResponse("Not authorized, user not found", 404));
    }

    req.user = user; // Attach user to request without password

    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized, token invalid", 401));
  }
};
