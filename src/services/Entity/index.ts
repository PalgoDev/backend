import axios from "axios";
import { Entity, createEntity, Result } from "../../models";
import { useEntityDbClient } from "../../utils/database";

export const getNearbyPlacesToCordinateService = async (
  longitude,
  latitude,
  limit = 10
): Promise<Result<Entity[]>> => {
  try {
    const response = await useEntityDbClient.getClosestEntities(
      parseFloat(longitude),
      parseFloat(latitude),
      limit
    );

    return { status: 200, data: response.data };
  } catch (e: any) {
    return { status: 400, data: e.message };
  }
};

export const getNearbyPlacesIndividuallyToCordinateService = async (
  longitude,
  latitude,
  limit = 10
): Promise<Result<Entity[]>> => {
  try {
    const response_0: any =
      await useEntityDbClient.getClosestEntitiesIndividually(
        parseFloat(longitude),
        parseFloat(latitude),
        limit,
        0
      );
    const response_1: any =
      await useEntityDbClient.getClosestEntitiesIndividually(
        parseFloat(longitude),
        parseFloat(latitude),
        limit,
        1
      );
    const response_2: any =
      await useEntityDbClient.getClosestEntitiesIndividually(
        parseFloat(longitude),
        parseFloat(latitude),
        limit,
        2
      );
    //merge all the responses dats
    const response = {
      data: response_0.data.concat(response_1.data).concat(response_2.data),
    };

    return { status: 200, data: response.data };
  } catch (e: any) {
    return { status: 400, data: e.message };
  }
};
