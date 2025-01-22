import chalk from "chalk";
import chalkTable from "chalk-table";

const options = {
  leftPad: 2,
  columns: [
    { field: "id",     name: chalk.cyan("ID") },
    { field: "fruit",  name: chalk.magenta("Fruit") },
    { field: "veggie", name: chalk.green("Vegetable") },
    { field: "other",  name: chalk.yellow("Other") }
  ]
};
 
export const firstTable = chalkTable(options, [
  { id: 0, fruit: "🍇 Grapes",     veggie: "🌽 Maize",    other: "🍕 Pizza" },
  { id: 1, fruit: "🍈 Melon",      veggie: "🍅 Tomato",   other: "🍔 Hamburger" },
  { id: 2, fruit: "🍉 Watermelon", veggie: "🥑 Avocado",  other: "🌭 Hot Dog" },
  { id: 3, fruit: "🍊 Tangerine",  veggie: "🥦 Broccoli", other: "🥪 Sandwich" },
  { id: 4, fruit: "🍍 Pineapple",  veggie: "🥒 Cucumber", other: "🌮 Taco" }
]);
 
