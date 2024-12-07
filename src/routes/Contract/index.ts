import { makeCallback } from "../../utils";
import {
  mintTokensForUserController,
  getContractDataController,
} from "../../controllers/Contract";

import express from "express";
export const contractRouter = express.Router();

contractRouter.post(
  "/mintTokensForUser",
  makeCallback(mintTokensForUserController)
);

contractRouter.get("/contractData", makeCallback(getContractDataController));
