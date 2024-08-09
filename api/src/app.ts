import cors from "cors";
import express from "express";
import errorHandler from "./middlewares/error-handler.middleware";
import globalRouter from "./routes";
import { NotFound } from "http-errors";
import asyncErrorHandler from "./lib/async-error-handler";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", globalRouter);

app.use(
  "*",
  asyncErrorHandler(() => {
    throw new NotFound("Invalid Route");
  })
);

app.use(errorHandler);

export default app;
