import { ChainId } from "../../config";
import { Address } from "viem";
import { getWalletClient } from "./viemClient";
import { abi } from "../../abis/UserItems.json";

export const addressByChainId = {
  137: "0x3365c64eB8416a8168d95b4c265651a6ebC51Cd1",
} as const;

export const mintTokens = async (
  chainId: ChainId,
  account: Address,
  tokenId: number,
  amount: number
) => {
  const walletClient = getWalletClient(chainId);
  const hash = await walletClient.writeContract({
    abi,
    address: addressByChainId[chainId],
    functionName: "mint",
    args: [account, tokenId, amount, ""],
  });
  return hash;
};

export const burnTokens = async (
  chainId: ChainId,
  account: Address,
  tokenId: number,
  amount: number
) => {
  const walletClient = getWalletClient(chainId);
  const hash = await walletClient.writeContract({
    abi,
    address: addressByChainId[chainId],
    functionName: "burn",
    args: [account, tokenId, amount],
  });
  return hash;
};
