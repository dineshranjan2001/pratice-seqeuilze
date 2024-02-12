import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: process.env.BODY_PARSER,
  })
);

app.use(express.static("public"));

import userRouter from "./routes/User.routes.js";
app.use("/api/v1/users", userRouter);

export { app };
