import { Game, Result } from "../../models";
import { useGameDbClient } from "../../utils/database";
import { updateUserService } from "../User";
import {
  mintTokensForUserService,
  burnTokensForUserService,
} from "../Contract";
import { USER_ITEM } from "../../config";
import { min } from "lodash";
import { parseEther } from "viem";
import { mint } from "viem/chains";
import {
  getLeaderBoardsFromParamsService,
  updateLeaderBoardService,
} from "../LeaderBoard";

export const createGameService = async (
  game: Pick<Game, Exclude<keyof Game, "id">>
): Promise<Result<Game[]>> => {
  const response = await useGameDbClient.insertGame(game);
  return { status: response.status, data: response.data };
};

export const getGameService = async (id: string): Promise<Result<Game[]>> => {
  const response = await useGameDbClient.findById(id);
  return { status: response.status, data: response.data };
};

export const getAllGameService = async (): Promise<Result<Game[]>> => {
  const response = await useGameDbClient.getAll();
  return { status: response.status, data: response.data };
};

const simulate_fight = (player1, player2) => {
  const damageToP2 = Math.max(player1.attack - player2.defense, 0);
  const damageToP1 = Math.max(player2.attack - player1.defense, 0);
  const damages: number[] = [];

  let p1Health = player1.health;
  let p2Health = player2.health;

  while (p1Health > 0 && p2Health > 0) {
    // Player 1 attacks Player 2
    if (p2Health > 0) {
      damages.push(damageToP2);
      p2Health -= damageToP2;
    }

    // Player 2 attacks Player 1
    if (p1Health > 0 && p2Health > 0) {
      // Check if both are still alive
      damages.push(damageToP1);
      p1Health -= damageToP1;
    }
  }

  // Determine the result
  let result: number = 0;
  if (p1Health > 0 && p2Health <= 0) {
    result = 1;
  } else if (p2Health > 0 && p1Health <= 0) {
    result = 2;
  } else {
    result = 3;
  }

  return {
    data: {
      damages,
      result,
      finalHealths: {
        player1: Math.max(p1Health, 1),
        player2: Math.max(p2Health, 1),
      },
    },
  };
};

export const simulateGameService = async (
  id: string
): Promise<Result<any[]>> => {
  const response: any = await useGameDbClient.findDetailGameInfoById(id);
  if (response.status === 404) {
    return { status: 404, data: "Game not Found" };
  }

  const player_1_attack = response.data[0].player1.attack;
  const player_1_defense = response.data[0].player1.defense;
  const player_1_health = response.data[0].player1.health;
  const player_2_attack = response.data[0].player2.attack;
  const player_2_defense = response.data[0].player2.defense;
  const player_2_health = response.data[0].player2.health;

  const player1 = {
    attack: player_1_attack,
    defense: player_1_defense,
    health: player_1_health,
  };
  const player2 = {
    attack: player_2_attack,
    defense: player_2_defense,
    health: player_2_health,
  };
  const gameResponse = simulate_fight(player1, player2);

  //lower the users healths
  await updateUserService({
    ...response.data[0].player1,
    health: gameResponse.data.finalHealths.player1,
  });
  await updateUserService({
    ...response.data[0].player2,
    health: gameResponse.data.finalHealths.player2,
  });
  const player1_burned_health_res = await burnTokensForUserService(
    response.data[0].player1,
    137,
    USER_ITEM.HEALTH,
    player1.health - gameResponse.data.finalHealths.player1
  );
  console.log("player1_burned_health_res", player1_burned_health_res);
  const player2_burned_health_res = await burnTokensForUserService(
    response.data[0].player2,
    137,
    USER_ITEM.HEALTH,
    player2.health - gameResponse.data.finalHealths.player2
  );
  console.log("player2_burned_health_res", player2_burned_health_res);

  const leaderBoard1 = await getLeaderBoardsFromParamsService({
    email: response.data[0].player1.email,
  });
  const leaderBoard2 = await getLeaderBoardsFromParamsService({
    email: response.data[0].player2.email,
  });

  //update the user
  if (gameResponse.data.result === 1) {
    await updateUserService({
      ...response.data[0].player1,
      attack: player_1_attack + 1,
    });
    await updateLeaderBoardService({
      ...leaderBoard1.data[0],
      wins: leaderBoard1.data[0].wins + 1,
    });
    await updateLeaderBoardService({
      ...leaderBoard2.data[0],
      losses: leaderBoard2.data[0].losses + 1,
    });
    const player1_attack_increase_res = await mintTokensForUserService(
      response.data[0].player1.id,
      137,
      USER_ITEM.ATTACK,
      1
    );
    console.log("player1_attack_increase_res", player1_attack_increase_res);
    const player1_cash_increase = await mintTokensForUserService(
      response.data[0].player1.id,
      137,
      USER_ITEM.CASH,
      parseEther("10").toString()
    );
    console.log("player1_cash_increase", player1_cash_increase);
  } else if (gameResponse.data.result === 2) {
    await updateUserService({
      ...response.data[0].player2,
      attack: player_2_attack + 1,
    });
    await updateLeaderBoardService({
      ...leaderBoard2.data[0],
      wins: leaderBoard2.data[0].wins + 1,
    });
    await updateLeaderBoardService({
      ...leaderBoard1.data[0],
      losses: leaderBoard1.data[0].losses + 1,
    });
    const player2_attack_increase_res = await mintTokensForUserService(
      response.data[0].player2.id,
      137,
      USER_ITEM.ATTACK,
      1
    );
    console.log("player2_attack_increase_res", player2_attack_increase_res);
    const player2_cash_increase_res = await mintTokensForUserService(
      response.data[0].player2.id,
      137,
      USER_ITEM.CASH,
      parseEther("10").toString()
    );
    console.log("player2_cash_increase_res", player2_cash_increase_res);
  }

  //update the game
  await updateGameService({
    id: parseInt(id),
    player_1_id: response.data[0].player1.id,
    player_2_id: response.data[0].player2.id,
    remarks: response.data[0].remarks,
    result: gameResponse.data.result,
  });

  //data:{ damages: number[]; result: number; }
  return { status: 200, data: gameResponse.data as any };
};

export const updateGameService = async (
  game: Game
): Promise<Result<Game[]>> => {
  const response = await useGameDbClient.updateGame(game);
  return { status: response.status, data: response.data };
};
