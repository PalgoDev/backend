import { Address } from "viem";
import { getUserItemsContract } from "./contract";
import { ChainId, USER_ITEM } from "../../config";
import { getPublicClient } from "./viemClient";

export const getUserInfo = async (address: Address, chainId: ChainId) => {
  const contract = getUserItemsContract(chainId);

  const contractFull = {
    ...contract,
    functionName: "balanceOf",
  };
  // console.log("PARAMS: ", USER_ITEM);
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

  if (
    cash.status != "success" ||
    health.status != "success" ||
    attack.status != "success" ||
    defense.status != "success" ||
    potion.status != "success" ||
    superPotion.status != "success"
  ) {
    return {
      status: 404,
      data: {
        message: "Contract data is corrupt",
      },
    };
  }

  return {
    status: 200,
    data: {
      cash: cash.result,
      health: health.result,
      attack: attack.result,
      defense: defense.result,
      potion: defense.result,
      superPotion: superPotion.result,
    },
  };
};
