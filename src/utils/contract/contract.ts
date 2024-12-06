import { Address, getContract } from "viem";
import { abi } from "../../abis/UserItems.json";
import { getWalletClient } from "./viemClient";
import memoize from "lodash/memoize";

const addressByChainId = {
  137: "0x3365c64eB8416a8168d95b4c265651a6ebC51Cd1",
} as const;

export const getUserItemsContract = memoize(
  (chainId: keyof typeof addressByChainId) =>
    getContract({
      abi,
      address: addressByChainId[chainId],
      client: getWalletClient(chainId),
    })
);
