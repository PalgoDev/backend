import { getUserItemsContract } from "./contract";
import { ChainId } from "../../config";
import { Address } from "viem";

export const mintTokens = async (
  chainId: ChainId,
  account: Address,
  tokenId: number,
  amount: number
) => {
  const contract = getUserItemsContract(chainId);
  const hash = await contract.write.mint([account, tokenId, amount, ""]);
  return hash;
};

export const burnTokens = async (
  chainId: ChainId,
  account: Address,
  tokenId: number,
  amount: number
) => {
  const contract = getUserItemsContract(chainId);
  const hash = await contract.write.burn([account, tokenId, amount]);
  return hash;
};
