import { makeCallback } from "../../utils";
import {
  getGameController,
  createGameController,
  getAllGameController,
  simulateGameController,
  createAndSimulateGameController,
} from "../../controllers/Game";

import express from "express";
export const gameRouter = express.Router();

gameRouter.get("/:id", makeCallback(getGameController));

gameRouter.get("/", makeCallback(getAllGameController));

gameRouter.post("/", makeCallback(createGameController));

gameRouter.post("/simulate/:id", makeCallback(simulateGameController));

gameRouter.put("/", makeCallback(createGameController));

gameRouter.post(
  "/createAndSimulate",
  makeCallback(createAndSimulateGameController)
);
