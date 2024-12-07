import { makeCallback } from "../../utils";
import { getNearbyPlacesToCordinateController } from "../../controllers/Entity";

import express from "express";
export const entityRouter = express.Router();

entityRouter.get("/", makeCallback(getNearbyPlacesToCordinateController));
