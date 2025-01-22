import { checkDices } from "./intransitive-dices.js";
import { intransitiveDiceTable } from "./Dice.js";
import { rl, close, question, questionLoop } from "./question.js";
import { SecretandHMAC } from "./HMAC.js";
import { Process } from "./playProces.js";
import { assignDices } from "./assignDices.js";
try {
  //check if the Dices are suitable for the task
  let firstFlag = checkDices(process.argv.slice(2));
  //If it is okay proceed
  if (firstFlag?.status == true) {
    let batch = new intransitiveDiceTable();
    batch.generateDices(firstFlag.batch);
    //batch.showTable();
    //Ask who goes First
    let whogoesFirst = new SecretandHMAC(0, 1);
    console.log(`Let's determine who makes the first move
I selected a random value in the range 0..1
(HMAC ${whogoesFirst.getHMAC()}).
Try to guess my selection.`);

    //test if the input is good
    let secondFlag = false;
    let questionSecondFlag = `0 - 0\n1 - 1\nX - exit\n? - help\n`;
    let response = "";
    response = await questionLoop(secondFlag, questionSecondFlag);
    console.log(
      `Your selection: ${response}\nMy selection: ${
        whogoesFirst.randomNumber
      } (KEY=${whogoesFirst.getSecret()})`
    );

    //take turns
    if (response == whogoesFirst.randomNumber) {
      let t = await assignDices(batch, 1);
    } else {
      let t = await assignDices(batch, 2);
    }
  }

  rl.close();
} catch (e) {
  console.error(e);
  process.exit(1);
}
