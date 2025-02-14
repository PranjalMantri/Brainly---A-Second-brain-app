import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const signJwt = (
  object: Object,
  options?: jwt.SignOptions | undefined
) => {
  // converting a complex object to string and then back to json to make it json serializable
  const payload = JSON.parse(JSON.stringify(object));

  if (!jwtSecret) {
    return null;
  }

  return jwt.sign(payload, jwtSecret, {
    ...(options && options),
    algorithm: "HS256",
  });
};
