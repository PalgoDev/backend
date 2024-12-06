import axios from "axios";
import { Entity, createEntity, Result } from "../../models";
import { useEntityDbClient } from "../../utils/database";

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

export const getNearbyPlacesService = async (
  latitude,
  longitude,
  radius = 1000
) => {
  console.log("MAPBOX_ACCESS_TOKEN:", MAPBOX_ACCESS_TOKEN);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/restaurant.json`;
  const params = {
    access_token: MAPBOX_ACCESS_TOKEN,
    proximity: `${longitude},${latitude}`,
    limit: 10,
    types: "poi",
    radius: radius,
  };

  try {
    const response = await axios.get(url, { params });
    return { status: 200, data: response.data.features };
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return { status: 400, data: error };
  }
};

export const getNearbyPlacesStorageService = async (
  latitude: number,
  longitude: number,
  bfs_depth = 3
): Promise<Result<User[]>> => {
  const visited = new Set();
  const queue = [{ latitude, longitude }];
  const places: ReturnType<typeof createEntity>[] = [];

  const latOffset = 1000 / 111000;
  const lonOffset = 1000 / (111000 * Math.cos(latitude * (Math.PI / 180)));

  for (let depth = 0; depth < bfs_depth; depth++) {
    const { latitude, longitude }: any = queue.shift();

    const key = `${latitude},${longitude}`;
    if (visited.has(key)) continue;
    visited.add(key);

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/restaurant.json`;
    const params = {
      access_token: MAPBOX_ACCESS_TOKEN,
      proximity: key,
      limit: 10,
      types: "poi",
    };

    try {
      const response = await axios.get(url, { params });
      response.data.features.forEach((place: any) => {
        const placeKey = `${place.center[1]},${place.center[0]}`;
        if (!visited.has(placeKey)) {
          places.push({
            place_name: place.place_name,
            address: place.properties?.address,
            latitude_longitude: placeKey,
            latitude: place.center[1],
            longitude: place.center[0],
          });
          visited.add(placeKey);
        }
      });

      // Add neighboring points to the queue if queue has less than bfs_depth elements
      if (queue.length >= bfs_depth) continue;
      queue.push({ latitude: latitude + latOffset, longitude });
      queue.push({ latitude: latitude - latOffset, longitude });
      queue.push({ latitude, longitude: longitude + lonOffset });
      queue.push({ latitude, longitude: longitude - lonOffset });
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  }

  // Store in Supabase
  const response = await useEntityDbClient().insertMultipleEntities(places);

  if (error) {
    console.error("Error storing places in Supabase:", error);
    return { status: 400, data: error };
  }

  return { status: 200, data: places };
};
