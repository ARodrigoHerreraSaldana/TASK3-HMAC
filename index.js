import { checkDices } from "./intransitive-dices.js";
import { intransitiveDiceTable } from "./Dice.js";
import {rl,close,question , questionLoop} from "./question.js"
import { SecretandHMAC } from "./HMAC.js";
import { Process } from "./playProces.js";
try {
  //check if the Dices are suitable for the task
  let firstFlag = checkDices(process.argv.slice(2));
  //If it is okay proceed
  console.log(firstFlag.batch);
  if (firstFlag?.status == true) {
    let batch = new intransitiveDiceTable();
    batch.generateDices(firstFlag.batch);
    batch.showTable();
    //Ask who goes First
    let whogoesFirst = new SecretandHMAC(0,1);
    console.log(`Let's determine who makes the first move
I selected a random value in the range 0..1
(HMAC ${whogoesFirst.getHMAC()}).
Try to guess my selection.`);
    
    //test if the input is good
    let secondFlag = false;
    let questionSecondFlag=`0 - 0\n1 - 1\nX - exit\n? - help\n`
    let response = "";
    response=await questionLoop(secondFlag,questionSecondFlag)
    console.log(`Your selection: ${response}\nMy selection: ${whogoesFirst.randomNumber} (KEY=${whogoesFirst.getSecret()})`);
    

    if (true) {
        console.log("You guessed it correctly you go first");
        let [available,text]=batch.showAvailableDices()
        let thirdFlag = false;
        let questionThirdFlag=`Choose your dice:\n${text}X - exit\n? - help\n`
        let response = "";
        response=await questionLoop(thirdFlag,questionThirdFlag,1)

        let regex=/^[0-9]+$/
        if(regex.test(response))
        {
        let element=available.find((element)=> element.index==response)    
        let playerSelectedDice=batch.selectAndUpdateBatch(element.id,'player')
        
        let stringDices=JSON.stringify(playerSelectedDice.sides)
        let newStr = stringDices.replace(/"/g, " ").trim();
        
        console.log(`you selected the [${newStr}] dice`)
        let computerSelection=batch.SelectRandomlyFromBatch()
        console.log(`the computer selected [${computerSelection.sides}]`)
        console.log(`It's time to play\nI selected`)
        
        let t1=await Process(rl,playerSelectedDice,computerSelection,1)
    }

      }

    // if (response==randomNumber) {
    //   console.log("You guessed it correctly you go first");
    //   let UserDiceSelection = await question(
    //     `Choose your dice:\n${batch.showAvailableDices()}\nX - exit\n? - help`
    //   );
    // }

    // else {
    //   console.log(`You didn't guess it so I make the first move and I choose the ${SelectRandomlyFromBatch(arrayDices)} dice);
    // }
  }

  rl.close();
} catch (e) {
  console.error(e);
  process.exit(1);
}
