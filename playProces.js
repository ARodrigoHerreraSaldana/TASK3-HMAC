import { SecretandHMAC } from "./HMAC.js";
import { rl, close, question, questionLoop } from "./question.js";

export const Process = async function (PlayerselectedDice,ComputerselectedDice,whogoesFirst) {
  if (whogoesFirst == 1) {
    let playerDice = await returnsThrow(PlayerselectedDice, 1);
    console.log(`It's the computer turn`);
    let computerDice = await returnsThrow(ComputerselectedDice, 2);
    asignScore(playerDice, computerDice);
  }
  if (whogoesFirst == 2) {
    let computerDice2 = await returnsThrow(ComputerselectedDice, 2);
    console.log(`It's the player turn`);
    let playerDice2 = await returnsThrow(PlayerselectedDice, 1);
    asignScore(playerDice2, computerDice2);
  }
};

//Returns Throw
const returnsThrow = async function (selectedDice, whoisthrowing) {
  const menu1 = {
    text1: "Your throw is",
  };
  const menu2 = {
    text1: "The computer throw is",
  };
  let Secret = new SecretandHMAC(0, 6);
  console.log(
    `The computer selected a random value in the range 0..5 (HMAC=${Secret.getHMAC()})`
  );
  let questionflag = `Add your number modulo 6.\n0 - 0\n1 - 1\n2 - 2\n3 - 3\n4 - 4\n5 - 5\nX - exit\n? - help\n`;
  let flag = false;
  let response = "";
  response = await questionLoop(flag, questionflag, 2);
  console.log("Your selection", response);
  console.log(
    `The number is ${Secret.randomNumber} (KEY=${Secret.getSecret()})`
  );
  let addition = Number(response) + Number(Secret.randomNumber);
  let resultMod = addition % 6;
  console.log(
    `The result is ${response} + ${Secret.randomNumber} = ${resultMod} (mod 6)`
  );
  let array = selectedDice.sides.split(",").map(Number);

  if (whoisthrowing == 1) console.log(`${menu1.text1} ${array[resultMod]}`);
  else if (whoisthrowing == 2) {
    console.log(`${menu2.text1} ${array[resultMod]}`);
  }
  return array[resultMod];
};

//function that tells me who won
const asignScore = function (playerDice, computerDice) {
  if (playerDice > computerDice) {
    console.log("The player wins");
  } else if (playerDice === computerDice) {
    console.log("Draw Match");
  } else {
    console.log("The computer wins");
  }
};
