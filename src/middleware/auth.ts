import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { apiResponse } from "../utils/apiResponse";
import dotenv from "dotenv";
import { User, UserDocument } from "../models/user.model";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || "";

export const verifyJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).send(apiResponse(false, "Unauthorized access"));
      return;
    }

    const decodedToken = jwt.verify(token, jwtSecret) as UserDocument;

    const user = await User.findById(decodedToken._id);

    if (!user) {
      res.status(401).send(apiResponse(false, "Invalid Access Token"));
    }

    req.body = user;
    next();
  } catch (error: any) {
    res
      .status(401)
      .send(apiResponse(false, error.message || "Invalid Access Token"));
  }
};
