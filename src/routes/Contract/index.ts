import { makeCallback } from "../../utils";
import { mintTokensForUserController } from "../../controllers/Contract";

import express from "express";
export const contractRouter = express.Router();

contractRouter.post(
  "/mintTokensForUser",
  makeCallback(mintTokensForUserController)
);
