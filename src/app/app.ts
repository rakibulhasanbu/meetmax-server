import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import routes from "./routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import admin from "firebase-admin";
import { config } from "../config";

const app: Application = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.options("*", cors());

//google config
admin.initializeApp({
  credential: admin.credential.cert(config.firebase as admin.ServiceAccount),
});

//parser
// Adjust the payload size limit here
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ limit: "4mb", extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Meetmax server app server is running perfectly",
  });
});

app.use("/api", routes);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
