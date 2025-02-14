import { Request, Response } from "express";
import { createUser, getUserDetails } from "../services/user.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    // get user details
    const { email, username, password } = req.body;

    // use the create use service to create the user
    const user: any = await createUser({ email, username, password });

    const existingUser = await getUserDetails(user._id);

    // return the use data without the password
    res.status(201).send(existingUser);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};
