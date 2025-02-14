import { Request, Response } from "express";
import { createUser, getUserDetails } from "../services/user.service";

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
