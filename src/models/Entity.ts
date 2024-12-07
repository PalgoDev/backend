import { z } from "zod";

export const EntitySchema = z.object({
  id: z.number(),
  created_at: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  longitude_latitude: z.string(),
  place_name: z.string(),
  address: z.string(),
  type: z.number(),
});

export type Entity = z.infer<typeof EntitySchema>;

export const createEntity = (entity: Entity) => {
  return Object.freeze({
    latitude: entity.latitude,
    longitude: entity.longitude,
    longitude_latitude: entity.longitude_latitude,
    place_name: entity.place_name,
    address: entity.address,
    type: entity.type,
  });
};
