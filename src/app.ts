import express, { Response, Request } from "express";
import compression from "compression";
import session from "express-session";
import bodyParser from "body-parser";
import logger from "./util/logger";
import dotenv from "dotenv";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
import morgan from "morgan";
import { Status } from "./interfaces/data";

const MongoStore = mongo(session);

dotenv.config({ path: ".env.example" });

import * as apiRoute from "./routes/api";
import * as todoRoute from "./routes/todo";

const app = express();

const mongoUrl = MONGODB_URI;
(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl, { useMongoClient: true }).then(
  () => {
    logger.info(`MongoDB connection success at ${mongoUrl}`);
  },
).catch(err => {
  logger.error(`MongoDB connection error. Please make sure MongoDB is running.\n${err}`);
});

process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err}`);
});

process.on("unhandledRejection", (reason, p) => {
  logger.error(`Unhandled Rejection at: ${p} - reason: ${reason}`);
});

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MongoStore({
    url: mongoUrl,
    autoReconnect: true
  })
}));

app.get("/api/status", apiRoute.status);
app.get("/api/todo", todoRoute.getAll);
app.post("/api/todo", todoRoute.create);
app.get("/api/todo/:id", todoRoute.getById);
app.put("/api/todo/:id", todoRoute.checkById);
app.delete("/api/todo/:id", todoRoute.deleteById);

app.use((req: Request, res: Response): void => {
  res.status(404).send({
    status: Status.fail,
    data: "Not Found"
  });
});

export default app;
