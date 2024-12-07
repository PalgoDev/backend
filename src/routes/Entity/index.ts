import { makeCallback } from "../../utils";
import {
  getNearbyPlacesToCordinateController,
  getNearbyPlacesIndividuallyToCordinateController,
} from "../../controllers/Entity";

import express from "express";
export const entityRouter = express.Router();

entityRouter.get("/", makeCallback(getNearbyPlacesToCordinateController));
entityRouter.get(
  "/individually",
  makeCallback(getNearbyPlacesIndividuallyToCordinateController)
);
