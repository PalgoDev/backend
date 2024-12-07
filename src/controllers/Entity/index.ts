import { Result } from "../../models";
import {
  getNearbyPlacesToCordinateService,
  getNearbyPlacesIndividuallyToCordinateService,
} from "../../services/Entity";
import { Request } from "express";

import dotenv from "dotenv";
dotenv.config();

export const getNearbyPlacesToCordinateController = async (
  req: Request
): Promise<Result<any[] | string>> => {
  try {
    const latitude: number = parseFloat(req.query?.latitude as string);
    const longitude: number = parseFloat(req.query?.longitude as string);
    const limit: number = parseInt(req.query?.limit as string) || 10;

    if (!latitude || isNaN(+latitude)) {
      throw new Error("No/Invalid latitude found. latitude: " + latitude);
    }

    if (!longitude || isNaN(+longitude)) {
      throw new Error("No/Invalid longitude found. longitude: " + longitude);
    }

    return await getNearbyPlacesToCordinateService(longitude, latitude, limit);
  } catch (e: any) {
    console.log(e);
    return { status: 400, data: e };
  }
};

export const getNearbyPlacesIndividuallyToCordinateController = async (
  req: Request
): Promise<Result<any[] | string>> => {
  try {
    const latitude: number = parseFloat(req.query?.latitude as string);
    const longitude: number = parseFloat(req.query?.longitude as string);
    const limit: number = parseInt(req.query?.limit as string) || 10;

    if (!latitude || isNaN(+latitude)) {
      throw new Error("No/Invalid latitude found. latitude: " + latitude);
    }

    if (!longitude || isNaN(+longitude)) {
      throw new Error("No/Invalid longitude found. longitude: " + longitude);
    }

    return await getNearbyPlacesIndividuallyToCordinateService(
      longitude,
      latitude,
      limit
    );
  } catch (e: any) {
    console.log(e);
    return { status: 400, data: e };
  }
};
