import chalk from "chalk";
import chalkTable from "chalk-table";
import { countWins } from "./bestDice.js";
export const options = {
  leftPad: 2,
  columns: [{ field: "playerDice", name: chalk.cyan("User dice v") }],
};

export const generateDynamicTable = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    options.columns.push({
      field: `probability${i + 1}`,
      name: chalk.magenta(`${arr[i]}`),
    });
  }
  //array data
  let array = [];
  for (let i = 0; i < arr.length; i++) {
    let obj = {};
    obj.playerDice = chalk.magenta(arr[i]);
    for (let j = 0; j < arr.length; j++) {
      obj[`probability${j + 1}`] = countWins(arr[i], arr[j]);
    }
    array.push(obj);
  }
  const firstTable = chalkTable(options, array);
  return firstTable;
};
