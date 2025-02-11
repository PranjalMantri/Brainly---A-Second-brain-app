import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongodb_uri: string | undefined = process.env.MONGODB_URI;

const connectDb = async (): Promise<void> => {
  if (!mongodb_uri) {
    throw new Error("MONGODB_URI is not defined in envrironment variables");
  }

  try {
    await mongoose.connect(mongodb_uri);
    console.log("Successfully established a connection to the database");
  } catch (error) {
    console.log("Somethig went wrong while connecting to the database");
    process.exit(1);
  }
};

export default connectDb;
