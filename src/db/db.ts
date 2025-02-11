import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongodb_uri = process.env.MONGODB_URI;

const connectDb = async () => {
  if (!mongodb_uri) {
    throw new Error("MONGODB_URI is not defined in envrironment variables");
  }

  await mongoose
    .connect(mongodb_uri)
    .then(() => console.log("Successfuly connected to the database"))
    .catch((err) => {
      console.log("Something went wrong while connecting to the database", err);
      process.exit(1);
    });
};

export default connectDb;
