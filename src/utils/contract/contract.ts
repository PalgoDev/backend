import { Address, getContract } from "viem";
import { abi } from "../../abis/UserItems.json";
import { getWalletClient } from "./viemClient";
import memoize from "lodash/memoize";
import { getPublicClient } from "./viemClient";
import { addressByChainId } from "config";

export const getUserItemsContract = memoize(
  (chainId: keyof typeof addressByChainId) =>
    getContract({
      abi,
      address: addressByChainId[chainId],
      client: getWalletClient(chainId),
    })
);
