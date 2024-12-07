import { makeCallback } from "../../utils";
import {
  getLeaderBoardController,
  createLeaderBoardController,
  getAllLeaderBoardController,
  getLeaderBoardsFromParamsController,
  updateLeaderBoardController,
} from "../../controllers/LeaderBoard";

import express from "express";
export const leaderBoardRouter = express.Router();

leaderBoardRouter.get("/:id", makeCallback(getLeaderBoardController));

leaderBoardRouter.get("/", makeCallback(getAllLeaderBoardController));

leaderBoardRouter.post("/", makeCallback(createLeaderBoardController));

leaderBoardRouter.put("/", makeCallback(updateLeaderBoardController));

leaderBoardRouter.get(
  "/search/params",
  makeCallback(getLeaderBoardsFromParamsController)
);
