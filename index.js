import { checkDices } from "./intransitive-dices.js"
import { intransitiveDice,generateDices,showObject,SelectFromBatch } from "./Dice.js"
try{
    let firstFlag=checkDices(process.argv.slice(2))
    console.log(firstFlag)
    if(firstFlag?.status==true){
        let arrayDices=generateDices(firstFlag.batch)
        const selectedDice=SelectFromBatch(1,arrayDices)
        console.log('selectedDice', selectedDice);
    }
}
catch(e)
{
    console.error(error)
    process.exit(1);
}