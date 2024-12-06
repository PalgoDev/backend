import { createPublicClient, http } from "viem";
import { Chain, bsc, polygon, base } from "viem/chains";
import memoize from "lodash/memoize";

const chainById = {
  [bsc.id]: bsc,
  [polygon.id]: polygon,
  [base.id]: base,
};

export const getPublicClient = memoize((chainId: keyof typeof chainById) => {
  const client = createPublicClient({
    chain: chainById[chainId],
    transport: http(),
  });
  return client;
});
