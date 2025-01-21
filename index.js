import { checkDices } from "./intransitive-dices.js";
import { intransitiveDiceTable } from "./Dice.js";
import readline from "readline";
import { SecretandHMAC } from "./HMAC.js";
import { randomInt } from "crypto";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//declare question using a promise
const question = (question) => {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const wrongInput = function (getData) {
  const regex = /[xX01?]/;
  if (!regex.test(getData)) {
    console.log("wrong input, those are not your options");
    return false;
  } else {
    return true;
  }
};

const printOptions = function (data) {
  let obj = {};
  let str = "";
  console.log("data", data);
  for (let i = 0; i < data.length; i++) {
    obj[i] = data[i];
    str += i.toString() + " - " + obj[i].toString() + "\n";
    console.log(str);
  }
  return str;
};

const getSides = function (list) {
  return list.map((element) => element.sides);
};

const close = function (response) {
  if (response == "x" || response == "X") {
    rl.close();
    process.exit(1);
  }
};

try {
  //check if the Dices are suitable for the task
  let firstFlag = checkDices(process.argv.slice(2));
  //If it is okay proceed
  console.log(firstFlag.batch);
  if (firstFlag?.status == true) {
    let batch = new intransitiveDiceTable();
    batch.generateDices(firstFlag.batch);
    batch.showTable();
    //Ask for the turn
    let randomNumber = randomInt(0, 2);
    let whogoesFirst = new SecretandHMAC(randomInt(1 - 0).toString());
    console.log(`Let's determine who makes the first move
I selected a random value in the range 0..1
(HMAC ${whogoesFirst.getHMAC()}).
Try to guess my selection.`);
    //test if the input is good
    let secondFlag = false;
    let response = "";
    while (!secondFlag) {
      response = await question(`0 - 0\n1 - 1\nX - exit\n? - help\n`);
      secondFlag = wrongInput(response);
    }
    //close if user press x or X
    close(response);

    //Chose something different than ? or X
    console.log(
      `Your selection: ${response}\nMy selection: ${randomNumber} (KEY=${whogoesFirst.getSecret()})`
    );

    if (response==randomNumber) {
      console.log("You guessed it correctly you go first");
      let UserDiceSelection = await question(
        `Choose your dice:\n${printOptions(
          getSides(arrayDices)
        )}X - exit\n? - help`
      );
    }

    // else {
    //   console.log(`You didn't guess it so I make the first move and I choose the ${SelectRandomlyFromBatch(arrayDices)} dice);
    // }
  }

  rl.close();
} catch (e) {
  console.error(e);
  process.exit(1);
}
