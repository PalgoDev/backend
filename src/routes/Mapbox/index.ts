import { makeCallback } from "../../utils";
import { getNearbyPlacesController } from "../../controllers/Mapbox";

import express from "express";
export const mapboxRouter = express.Router();

mapboxRouter.get("/", makeCallback(getNearbyPlacesController));
