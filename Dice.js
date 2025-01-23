import { randomInt } from "crypto";
export class intransitiveDice {
  constructor(id, sides) {
    this.id = id;
    this.sides = sides;
    this.selectedBy = 0;
  }
}

export class intransitiveDiceTable {
  constructor() {
    this.table = [];
    this.sides =[]
  }
  generateDices(args) {
    if (Array.isArray(args)) {
      for (let i = 0; i < args.length; i++) {
        let dice = new intransitiveDice(i + 1, args[i]);
        this.table.push(dice);
        this.sides.push(dice.sides)
      }
    } else {
      console.error("it is not an array");
    }
  }
  getDataForTheASCiiTable()
  {
    return this.sides
  }
  showTable() {
    return this.table;
  }

  selectAndUpdateBatch(id,player) {
    const selected=this.table.find((element) => element.id == id);
    selected.selectedBy=player
    return selected
  }

  //method that makes the computer select randomly a dice
  SelectRandomlyFromBatch() {
    let ids=this.table.filter((element)=>element.selectedBy==0).map((element)=>element.id)
    //find the element and update it
    let possibleid=ids[randomInt(0,ids.length)]
    let element=this.table.find((element)=> element.id == possibleid)
    element.selectedBy='computer'
    return element
}
showAvailableDices()
{

    let available=this.table.filter((element)=>element.selectedBy==0).map((element,index)=>{
        return {index,'id':element.id,'sides':element.sides}
    })
    let str=''
    for(let i=0; i<available.length; i++)
    {
        str+=available[i].index+' - '+available[i].sides+'\n' 
    }
    let indexes=available.map(element=>element.index.toString())
    return [available, str , indexes]
}
selectPlayerDice(response)
{
    const [available,str]=this.showAvailableDices()
    let element = available.find((element) => element.index == response);
    let playerSelectedDice = this.selectAndUpdateBatch(element.id, "player");
    return playerSelectedDice
}
}
// try {
//   let batch = new intransitiveDiceTable();
//   batch.generateDices(["1,2,3,4,5,6", "1,2,3,4,5,0","1,2,3,4,5,0"]);
//   batch.SelectRandomlyFromBatch();
//   batch.selectAndUpdateBatch(2,'Computer')
//   batch.selectAndUpdateBatch(1,'User')
//   batch.showTable();
// } 
// catch (e) {
// console.error(e);
// process.exit(1);
// }
