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
  }
  generateDices(args) {
    if (Array.isArray(args)) {
      for (let i = 0; i < args.length; i++) {
        let dice = new intransitiveDice(i + 1, args[i]);
        this.table.push(dice);
      }
    } else {
      console.error("it is not an array");
    }
  }
  showTable() {
    console.log(this.table);
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
