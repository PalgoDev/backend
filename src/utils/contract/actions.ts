import { getUserItemsContract } from "./contract";
import { ChainId } from "../../config";
import { Address } from "viem";
import { createPublicClient, createWalletClient, Hex, http } from "viem";
import { getPublicClient } from "./viemClient";
import { addressByChainId } from "./contract";
import { abi } from "../../abis/UserItems.json";

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

// export const burnTokens = async (
//   chainId: ChainId,
//   account: Address,
//   tokenId: number,
//   amount: number
// ) => {
//   const contract = getUserItemsContract(chainId);
//   const hash = await contract.write.burn([account, tokenId, amount]);
//   return "hash";
// };

export const getTokenBalance = async (
  chainId: ChainId,
  wallet_address: Address,
  token_id: number
) => {
  const publicClient = getPublicClient(chainId);
  const balance = await publicClient.readContract({
    abi,
    address: addressByChainId[chainId],
    functionName: "balanceOf",
    args: [wallet_address, token_id],
  });
  return { status: 200, data: balance };
};
