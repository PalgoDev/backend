import { addressByChainId, ChainId } from "../../config";
import { Address } from "viem";
import { getWalletClient } from "./viemClient";
import { abi } from "../../abis/UserItems.json";
import { getUserItemsContract } from "./contract";

export const mintTokens = async (
  chainId: ChainId,
  account: Address,
  tokenId: number,
  amount: number
) => {
  //   const walletClient = getWalletClient(chainId);
  //   const hash = await walletClient.writeContract({
  //     abi,
  //     address: addressByChainId[chainId],
  //     functionName: "mint",
  //     args: [account, tokenId, amount, ""],
  //   });

  const hash = await getUserItemsContract(chainId).write.mint([
    account,
    tokenId,
    amount,
    "",
  ]);
  return hash;
};

export const burnTokens = async (
  chainId: ChainId,
  account: Address,
  tokenId: number,
  amount: number
) => {
  //   const walletClient = getWalletClient(chainId);
  //   const hash = await walletClient.writeContract({
  //     abi,
  //     address: addressByChainId[chainId],
  //     functionName: "burn",
  //     args: [account, tokenId, amount],
  //   });

  const hash = await getUserItemsContract(chainId).write.burn([
    account,
    tokenId,
    amount,
  ]);

  return hash;
};
