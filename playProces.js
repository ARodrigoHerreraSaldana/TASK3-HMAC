import { SecretandHMAC } from "./HMAC.js";
import { rl, close, question, questionLoop } from "./question.js";



export const Process = async function (obj, batch) {
    await asignResult(obj,0,batch)
    console.log(`${whoisPlaying(obj,0)== 'playerSelectedDice' ? menu2.passThrow2:menu2.passThrow1}`)
    await asignResult(obj,1,batch)
    const Results=getScoresForBoth(obj)
    findWinner(Results.playerSelectedDice,Results.computerSelectedDice)
};

const menu1 = {
    text1: "Your throw is",
    text2: "My throw is",
  };

const menu2 ={
    passThrow1:"It's time for your throw",
    passThrow2:"It's time for me to throw"
}
//Returns Throw
const returnsThrow = async function (selectedDice, whoisthrowing,batch) {
  let Secret = new SecretandHMAC(0, 6);
  console.log(`The computer selected a random value in the range 0..5 (HMAC=${Secret.getHMAC()})`);
  let questionflag = `Add your number modulo 6.\n0 - 0\n1 - 1\n2 - 2\n3 - 3\n4 - 4\n5 - 5\nX - exit\n? - help\n`;
  let flag = false;
  let response = "";
  response = await questionLoop(flag, questionflag, 2,batch.getDataForTheASCiiTable());
  console.log(`Your selection ${response}\nThe number is ${Secret.randomNumber} (KEY=${Secret.getSecret()})`)
  let resultMod = (Number(response) + Number(Secret.randomNumber)) % 6;
  console.log(`The result is ${response} + ${Secret.randomNumber} = ${resultMod} (mod 6)`);
  let array = selectedDice.split(",").map(Number);
  const message = whoisthrowing == 'playerSelectedDice' ? `${menu1.text1} ${array[resultMod]}` : `${menu1.text2} ${array[resultMod]}`;
  console.log(message)
  return array[resultMod];
};

//function that tells me who won
const findWinner = function (playerDice, computerDice) {
  if (playerDice > computerDice) {
    console.log(`The player wins\n${playerDice} > ${computerDice}`);
  } else if (playerDice === computerDice) {
    console.log(`Draw Match\n${playerDice} = ${computerDice}`);
  } else {
    console.log(`The computer wins\n${playerDice} < ${computerDice}`);
  }
};

const asignResult= async function(obj,index,batch)
{
    for (const prop in obj[index]) {
        const result = await returnsThrow(obj[index][prop].sides,whoisPlaying(obj,index),batch)
        obj[index][prop].result=result
    }
}

//iterates trough the object and finds the scores
const getScoresForBoth=function(obj)
{ 
    let Results={}
    for(let i=0; i<obj.length; i++)
    {
    for(let prop in obj[i])
    Results[prop]=obj[i][prop].result
    }
    return Results
}

const whoisPlaying=function(obj,index)
{
    return Object.keys(obj[index])
}