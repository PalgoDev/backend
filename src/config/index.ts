export const SUPPORTED_CHAINS = [137] as const;

export type ChainId = (typeof SUPPORTED_CHAINS)[number];
