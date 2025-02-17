import dotenv from "dotenv";
import connectDb from "./db/db";
import app from "./app";

dotenv.config();

const port = process.env.PORT;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed ", error);
  });
