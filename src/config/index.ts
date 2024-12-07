export const SUPPORTED_CHAINS = [137] as const;

export type ChainId = (typeof SUPPORTED_CHAINS)[number];

export const addressByChainId = {
  137: "0x3365c64eB8416a8168d95b4c265651a6ebC51Cd1",
} as const;
