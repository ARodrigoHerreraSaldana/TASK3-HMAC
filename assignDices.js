import { intransitiveDiceTable } from "./Dice.js";
import { Process } from "./playProces.js";
import { questionLoop } from "./question.js";

export const assignDices = async function (batch, type) {
    let orderPlayers = [];
    if (type == 1) {
        await PlayerGoesFirst(orderPlayers, batch);
    } else {
        await ComputerGoesFirst(orderPlayers, batch);
    }
};
const selectFromBatch = async function (text,table) {
    let Flag = false;
    let questionFlag = `Choose your dice:\n${text}X - exit\n? - help\n`;
    let response = "";
    response = await questionLoop(Flag, questionFlag, 2,table);
    return response;
};

const alertPlayerDice = function (test) {
    let stringDices = JSON.stringify(test.sides);
    let newStr = stringDices.replace(/"/g, " ").trim();
    console.log(`you selected the [${newStr}] dice`);
};

const addPlayerDice = function (batch, response) {
    let playerSelectedDice = batch.selectPlayerDice(response);
    alertPlayerDice(playerSelectedDice);
    return playerSelectedDice;
};

const PlayerGoesFirst = async function (orderPlayers, batch) {
    console.log("You guessed it correctly you go first");
    let [available, text] = batch.showAvailableDices();
    let response = await selectFromBatch(text,batch.getDataForTheASCiiTable());
    let regex = /^[0-9]+$/;
    if (regex.test(response)) {
        let playerSelectedDice = addPlayerDice(batch, response);
        orderPlayers.push({ playerSelectedDice: playerSelectedDice });
        let computerSelectedDice = batch.SelectRandomlyFromBatch();
        orderPlayers.push({ computerSelectedDice: computerSelectedDice });
        console.log(`the computer selected [${computerSelectedDice.sides}]\nIt's time to play`);
        let t1 = await Process(orderPlayers,batch);
    }
};

const ComputerGoesFirst = async function (orderPlayers, batch) {
    console.log("You didn't guessed it correctly.The computer go first");
    let computerSelectedDice = batch.SelectRandomlyFromBatch();
    orderPlayers.push({ computerSelectedDice: computerSelectedDice });
    console.log(`the computer selected [${computerSelectedDice.sides}]`);
    let [available, text] = batch.showAvailableDices();
    let response = await selectFromBatch(text,batch.getDataForTheASCiiTable());
    let regex = /^[0-9]+$/;
    if (regex.test(response)) {
        let playerSelectedDice = addPlayerDice(batch, response);
        orderPlayers.push({ playerSelectedDice: playerSelectedDice });
        console.log(`It's time to play`);
        let t1 = await Process(orderPlayers,batch);
    }
};
