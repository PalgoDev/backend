import { Result, createUser, User } from "../../models";
import { getNearbyPlacesService } from "../../services/Mapbox";
import { Request } from "express";

import dotenv from "dotenv";
dotenv.config();

export const getNearbyPlacesController = async (
  req: Request
): Promise<Result<any[] | string>> => {
  try {
    const latitude: string = req.query?.latitude as string;
    const longitude: string = req.query?.longitude as string;

    if (!latitude || latitude.length == 0 || isNaN(+latitude)) {
      throw new Error("No/Invalid latitude found. latitude: " + latitude);
    }

    if (!longitude || longitude.length == 0 || isNaN(+longitude)) {
      throw new Error("No/Invalid longitude found. longitude: " + longitude);
    }

    // TODO: remove this
    // TODO: check if auth needed for getting blocks
    // const typeOfAuthorization = req.headers.authorization?.split(" ")[0];
    // const accessToken = req.headers.authorization?.split(" ")[1];
    // if (!(typeOfAuthorization && accessToken)) {
    //   return { status: 400, data: "No access token found" };
    // }

    return await getNearbyPlacesService(latitude, longitude);
  } catch (e: any) {
    return { status: 400, data: e };
  }
};
