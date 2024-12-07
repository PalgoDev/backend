import { makeCallback } from "../../utils";
import {
  mintTokensForUserController,
  getTokenBalanceForUserController,
  getContractDataController,
} from "../../controllers/Contract";

import express from "express";
export const contractRouter = express.Router();

contractRouter.post(
  "/mintTokensForUser",
  makeCallback(mintTokensForUserController)
);

contractRouter.get(
  "/:token_id",
  makeCallback(getTokenBalanceForUserController)
);

contractRouter.get("/contractData", makeCallback(getContractDataController));
