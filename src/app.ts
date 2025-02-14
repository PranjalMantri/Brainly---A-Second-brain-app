import express, { Application } from "express";

const app: Application = express();

app.use(express.json());

import userRouter from "./routes/user.routes";

app.use("/api/user", userRouter);

export default app;
