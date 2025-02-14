import { Types } from "mongoose";
import { User, CreateUserInput, UserDocument } from "../models/user.model";

export const createUser = async (
  userInput: CreateUserInput
): Promise<UserDocument> => {
  try {
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) throw new Error("User already exists");

    const user = await User.create(userInput);
    return user;
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const getUserDetails = async (
  userId: Types.ObjectId
): Promise<UserDocument> => {
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) throw new Error("User not found");

    return user;
  } catch (error: any) {
    throw new Error(`Error fetching user details: ${error.message}`);
  }
};
