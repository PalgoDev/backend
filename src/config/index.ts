export const SUPPORTED_CHAINS = [137] as const;

export type ChainId = (typeof SUPPORTED_CHAINS)[number];

export const addressByChainId = {
  137: "0x8462c842D6e4249da988DBf7A7FCAbcfaeFCa733", //polygon
  56: "0x0000000000000000000000000000000000000000", //bsc
  8453: "0x0000000000000000000000000000000000000000", //base
} as const;

export enum USER_ITEM {
  CASH = 0,
  HEALTH = 1,
  ATTACK = 2,
  DEFENSE = 3,

  POTION = 4,
  SUPER_POTION = 5,
}
