/*
======================================================
This is the entry point for the application.
It is responsible for setting up the application
and starting the server.

Please use #TODO comments to mark areas that need
to be changed or improved.

======================================================
*/

if (process.env.NODE_ENV === "development") {
  const dotenv = require("dotenv");
  dotenv.config();
}

import express, { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// for testing purposes, allow all origins
// #TODO: Remove this in production
app.use(
  cors({
    origin: "*",
  })
);

// ========================================
//                routing
// ========================================
import { userRouter } from "../src/routes/User";
import { mapboxRouter } from "../src/routes/Mapbox";
import { entityRouter } from "../src/routes/Entity";
import { gameRouter } from "../src/routes/Game";
import { contractRouter } from "../src/routes/Contract";
app.use("/user", userRouter);
app.use("/mapbox", mapboxRouter);
app.use("/entity", entityRouter);
app.use("/game", gameRouter);
app.use("/contract", contractRouter);

// ========================================
//                health check
// ========================================

app.get("/health", (_, res) => {
  res.status(200).send("OK");
});

// ========================================
//              error handling
// ========================================

app.use((err: any, _: Request, res: Response, __: any) => {
  console.error(err);
  res.status(err.status || 500).end(err.message);
});

// ========================================
//              start server
// ========================================

const port = process.env.PORT || 8081;

try {
  app.listen(port, () => {
    console.log("App listening on port " + port);
  });
} catch (error) {
  console.log(error);
  console.error("Error occurred while starting the server:", error);
}
