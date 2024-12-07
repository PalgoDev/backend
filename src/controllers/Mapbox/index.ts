import { Result, createEntity, Entity } from "../../models";
import {
  getNearbyPlacesService,
  getNearbyPlacesStorageService,
} from "../../services/Mapbox";
import { Request } from "express";

import dotenv from "dotenv";
import { parseInt } from "lodash";
dotenv.config();

export const getNearbyPlacesController = async (
  req: Request
): Promise<Result<any[] | string>> => {
  try {
    const latitude: string = req.query?.latitude as string;
    const longitude: string = req.query?.longitude as string;
    const radius: number = parseInt(req.query?.radius as string);
    const entity_type: number = parseInt(req.query?.entity_type as string);

    if (!latitude || latitude.length == 0 || isNaN(+latitude)) {
      throw new Error("No/Invalid latitude found. latitude: " + latitude);
    }

    if (!longitude || longitude.length == 0 || isNaN(+longitude)) {
      throw new Error("No/Invalid longitude found. longitude: " + longitude);
    }

    return await getNearbyPlacesService(
      latitude,
      longitude,
      radius,
      entity_type
    );
  } catch (e: any) {
    return { status: 400, data: e };
  }
};

export const createMultipleEntitiesController = async (
  req: Request
): Promise<Result<Entity[] | string>> => {
  try {
    let input = req.body;
    return await getNearbyPlacesStorageService(
      parseFloat(input.latitude),
      parseFloat(input.longitude),
      parseInt(input.bfs_depth),
      parseInt(input.entity_type)
    );
  } catch (e: any) {
    return { status: 400, data: e };
  }
};
