import { makeCallback } from "../../utils";
import {
  getGameController,
  createGameController,
  getAllGameController,
} from "../../controllers/Game";

import express from "express";
export const gameRouter = express.Router();

gameRouter.get("/:id", makeCallback(getGameController));

gameRouter.get("/", makeCallback(getAllGameController));

gameRouter.post("/", makeCallback(createGameController));
