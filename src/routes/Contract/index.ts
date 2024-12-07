import { makeCallback } from "../../utils";
import {
  mintTokensForUserController,
  getContractDataController,
  mintClaimOrbController,
} from "../../controllers/Contract";

import express from "express";
export const contractRouter = express.Router();

contractRouter.post(
  "/mintTokensForUser",
  makeCallback(mintTokensForUserController)
);

contractRouter.get("/contractData", makeCallback(getContractDataController));

contractRouter.post("/mint/ClaimOrb", makeCallback(mintClaimOrbController));
