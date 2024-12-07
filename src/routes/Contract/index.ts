import { makeCallback } from "../../utils";
import {
  mintTokensForUserController,
  getContractDataController,
  mintClaimOrbController,
  burnTokensForUserController,
  mintClaimPotionController,
  mintUsePotionController,
} from "../../controllers/Contract";

import express from "express";
export const contractRouter = express.Router();

contractRouter.post(
  "/mintTokensForUser",
  makeCallback(mintTokensForUserController)
);

contractRouter.post(
  "/burnTokensForUser",
  makeCallback(burnTokensForUserController)
);

contractRouter.post(
  "/mintTokensForUser",
  makeCallback(mintTokensForUserController)
);

contractRouter.get("/contractData", makeCallback(getContractDataController));

contractRouter.post("/mint/claimOrb", makeCallback(mintClaimOrbController));

contractRouter.post(
  "/mint/claimPotion",
  makeCallback(mintClaimPotionController)
);

contractRouter.post("/mint/usePotion", makeCallback(mintUsePotionController));
