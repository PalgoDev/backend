import { Address } from "viem";
import { getUserItemsContract } from "./contract";
import { ChainId, USER_ITEM } from "config";
import { getPublicClient } from "./viemClient";

export const getUserInfo = async (address: Address, chainId: ChainId) => {
  const contract = getUserItemsContract(chainId);

  const contractFull = {
    ...contract,
    functionName: "balanceOf",
  };

  const [cash, health, attack, defense, potion, superPotion] =
    await getPublicClient(chainId).multicall({
      contracts: [
        {
          ...contractFull,
          args: [address, USER_ITEM.CASH],
        },
        {
          ...contractFull,
          args: [address, USER_ITEM.HEALTH],
        },
        {
          ...contractFull,
          args: [address, USER_ITEM.ATTACK],
        },
        {
          ...contractFull,
          args: [address, USER_ITEM.DEFENSE],
        },
        {
          ...contractFull,
          args: [address, USER_ITEM.POTION],
        },
        {
          ...contractFull,
          args: [address, USER_ITEM.SUPER_POTION],
        },
      ],
    });
  console.log("ANS: ", { cash, health, attack, defense, potion, superPotion });
  return {
    status: 200,
    data: { cash, health, attack, defense, potion, superPotion },
  };
};
