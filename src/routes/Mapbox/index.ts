import { makeCallback } from "../../utils";
import {
  getNearbyPlacesController,
  createMultipleEntitiesController,
} from "../../controllers/Mapbox";

import express from "express";
export const mapboxRouter = express.Router();

mapboxRouter.get("/", makeCallback(getNearbyPlacesController));
mapboxRouter.post("/multiple", makeCallback(createMultipleEntitiesController));
