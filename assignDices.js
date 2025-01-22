import { intransitiveDiceTable } from "./Dice.js";
import { Process } from "./playProces.js";
import { questionLoop } from "./question.js";
export const assignDices = async function (batch, type) {
  //if the player goes first
  if (type == 1) {
    console.log("You guessed it correctly you go first");
    let [available, text] = batch.showAvailableDices();
    let thirdFlag = false;
    let questionThirdFlag = `Choose your dice:\n${text}X - exit\n? - help\n`;
    let response = "";
    response = await questionLoop(thirdFlag, questionThirdFlag, 2);
    let regex = /^[0-9]+$/;
    if (regex.test(response)) {
      let element = available.find((element) => element.index == response);
      let playerSelectedDice = batch.selectAndUpdateBatch(element.id, "player");
      let stringDices = JSON.stringify(playerSelectedDice.sides);
      let newStr = stringDices.replace(/"/g, " ").trim();
      console.log(`you selected the [${newStr}] dice`);
      let computerSelection = batch.SelectRandomlyFromBatch();
      console.log(`the computer selected [${computerSelection.sides}]`);
      console.log(`It's time to play`);
      let t1 = await Process(playerSelectedDice, computerSelection, type);
    }
  }
  //if the computer goes first
  else {
    console.log("You didn't guessed it correctly.The computer go first");
    let computerSelection = batch.SelectRandomlyFromBatch();
    console.log(`the computer selected [${computerSelection.sides}]`);
    let [available, text] = batch.showAvailableDices();
    let thirdFlag = false;
    let questionThirdFlag = `Choose your dice:\n${text}X - exit\n? - help\n`;
    let response = "";
    response = await questionLoop(thirdFlag, questionThirdFlag, 2);

    let regex = /^[0-9]+$/;
    if (regex.test(response)) {
      let element = available.find((element) => element.index == response);
      let playerSelectedDice = batch.selectAndUpdateBatch(element.id, "player");
      let stringDices = JSON.stringify(playerSelectedDice.sides);
      let newStr = stringDices.replace(/"/g, " ").trim();
      console.log(`you selected the [${newStr}] dice`);
      console.log(`It's time to play\nI selected`);
      console.log(`It's time to play`);
      let t1 = await Process(playerSelectedDice, computerSelection, type);
    }
  }
};
