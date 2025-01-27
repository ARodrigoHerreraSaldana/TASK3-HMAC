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
        let whogoesFirst = new SecretandHMAC(0, 2);
        console.log(`Let's determine who makes the first move\nI selected a random value in the range 0..1\n(HMAC ${whogoesFirst.getHMAC()})`);
        //test if the input is good
        let secondFlag = false;
        let questionSecondFlag = `Try to guess my selection\n0 - 0\n1 - 1\nX - exit\n? - help\n`;
        let response = "";
        response = await questionLoop(secondFlag, questionSecondFlag,1, batch.getDataForTheASCiiTable());
        console.log(`Your selection: ${response}\nMy selection: ${whogoesFirst.randomNumber} (KEY=${whogoesFirst.getSecret()})`);
        //take turns
        try {
            let t;
            if (response == whogoesFirst.randomNumber) {
                t = await assignDices(batch, 1);
            } else {
                t = await assignDices(batch, 2);
            }
        } catch (error) {
            console.error('Error occurred while assigning dices:', error);
        }
        
    }

    rl.close();
} catch (e) {
    console.error(e);
    process.exit(1);
}

