import { createPublicClient, createWalletClient, Hex, http } from "viem";
import { Chain, bsc, polygon, base } from "viem/chains";
import memoize from "lodash/memoize";
import { privateKeyToAccount } from "viem/accounts";

const chainById = {
  [bsc.id]: bsc,
  [polygon.id]: polygon, //137
  [base.id]: base,
};

export const getPublicClient = memoize((chainId: keyof typeof chainById) => {
  const client = createPublicClient({
    chain: chainById[chainId],
    transport: http(
      "https://polygon-mainnet.g.alchemy.com/v2/AF2A5lTVs_Uh_Zkk-BF-n91QH5F1FH47"
    ),
  });
  return client;
});

export const getWalletClient = memoize((chainId: keyof typeof chainById) => {
  const account = privateKeyToAccount(
    (process.env.DEFAULT_PRIV_KEY as Hex) || ""
  );
  const client = createWalletClient({
    chain: chainById[chainId],
    transport: http(
      "https://polygon-mainnet.g.alchemy.com/v2/AF2A5lTVs_Uh_Zkk-BF-n91QH5F1FH47"
    ),
    account,
  });
  return client;
});
