import { User, Result } from "../../models";
import { useUserDbClient } from "../../utils/database";
import { mintTokens } from "../../utils/contract";
import { ChainId } from "config";
import { Address } from "viem";

export async function mintTokensForUserService(
  user_id: string,
  chainId: ChainId,
  tokenId: number,
  amount: number
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
  return { status: 200, data: "response" };
}
