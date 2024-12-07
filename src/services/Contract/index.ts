import { User, Result } from "../../models";
import { useUserDbClient } from "../../utils/database";
import { mintTokens } from "../../utils/contract";
import { ChainId } from "config";
import { Address } from "viem";
import { getUserInfo } from "../../utils/contract/read";

export async function mintTokensForUserService(
  user_id: string,
  chainId: ChainId,
  tokenId: number,
  amount: number | string
): Promise<Result<any[]>> {
  const user: any = await useUserDbClient.findById(user_id);
  if (!user || user.status !== 200) {
    return { status: 400, data: "User not found" };
  }

  const user_wallet_address = user.data[0].wallet_address;
  const response = await mintTokens(
    chainId,
    user_wallet_address as Address,
    tokenId,
    amount
  );
  return { status: 200, data: response };
}

export async function getContractData(
  user_id: string,
  chainId: ChainId
): Promise<Result<any[]>> {
  const user: any = await useUserDbClient.findById(user_id);
  if (!user || user.status !== 200) {
    console.log("USER NOT FOUND");
    return { status: 400, data: "User not found" };
  }
  const user_wallet_address = user.data[0].wallet_address;
  const response: any = await getUserInfo(user_wallet_address, chainId);
  return { status: 200, data: response.data };
}
