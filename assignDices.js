import { intransitiveDiceTable } from "./Dice.js";
import { Process } from "./playProces.js";
import { questionLoop, questionLoopForDices } from "./question.js";

export const assignDices = async function (batch, type) {
    let orderPlayers = [];
    if (type == 1) {
        await PlayerGoesFirst(orderPlayers, batch);
    } else {
        await ComputerGoesFirst(orderPlayers, batch);
    }
};
const selectFromBatch = async function (obj,table) {
    let Flag = false;
    let response = "";
    response = await questionLoopForDices(Flag,obj,table);
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
    let response = await selectFromBatch(batch.showAvailableDices(),batch.getDataForTheASCiiTable());
    let regex = /^[0-9]+$/;
    if (regex.test(response)) {
        let playerSelectedDice = addPlayerDice(batch, response);
        orderPlayers.push({ playerSelectedDice: playerSelectedDice });
        let computerSelectedDice = batch.SelectRandomlyFromBatch();
        orderPlayers.push({ computerSelectedDice: computerSelectedDice });
        console.log(`I selected [${computerSelectedDice.sides}]\nIt's time to play`);
        let t1 = await Process(orderPlayers,batch);
    }
};

const ComputerGoesFirst = async function (orderPlayers, batch) {
    console.log("You didn't guessed it correctly. I go first");
    let computerSelectedDice = batch.SelectRandomlyFromBatch();
    orderPlayers.push({ computerSelectedDice: computerSelectedDice });
    console.log(`I selected [${computerSelectedDice.sides}]`);
    let response = await selectFromBatch(batch.showAvailableDices(),batch.getDataForTheASCiiTable());
    let regex = /^[0-9]+$/;
    if (regex.test(response)) {
        let playerSelectedDice = addPlayerDice(batch, response);
        orderPlayers.push({ playerSelectedDice: playerSelectedDice });
        console.log(`It's time to play`);
        let t1 = await Process(orderPlayers,batch);
    }
};
