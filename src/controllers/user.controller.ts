import { Request, Response } from "express";
import {
  createUser,
  findUserByEmail,
  getUserDetails,
} from "../services/user.service";
import { signJwt } from "../utils/jwt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    // get user details
    const { email, username, password } = req.body;

    // use the create use service to create the user
    const user = await createUser({ email, username, password });

    if (!user) {
      res.status(400).json({ message: "User could not be created" });
    }

    const existingUser = await getUserDetails(user._id);

    if (!existingUser) {
      res.status(404).json({ message: "User details not found" });
    }

    // return the use data without the password
    res.status(201).send(existingUser);
  } catch (error: any) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  // get user details
  const { email, password } = req.body;

  // check if user exists
  const existingUser = await findUserByEmail(email);

  // verfify the password
  const isValid = existingUser.comparePasswords(password);

  if (!isValid) {
    res.status(404).send({ message: "User does not exist" });
    return;
  }

  // generate jwt
  const accessToken = signJwt(existingUser, { expiresIn: "15m" });
  const refreshToken = signJwt(existingUser, { expiresIn: "30d" });

  // return accessToken and refreshToken
  res.status(200).send({ accessToken, refreshToken });
};
