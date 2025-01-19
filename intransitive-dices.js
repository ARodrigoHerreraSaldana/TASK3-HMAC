export function checkDices(args) {
  const regex = /^([1-9]\d*)(,[1-9]\d*){5}$/;
  let TestComplete = {status:false, batch:args};
  if (args.length < 2) {
    console.error("Insert at least two dices !");
    TestComplete.status = false
    return TestComplete;
  }
  args.forEach((element) => {
    if (!regex.test(element)) {
      console.error(
        "Parameters at least be a pair of dices like 1,2,3,4,5,6 2,2,2,2,2,2,2. Remember their sides should be greater than 0"
      );
      TestComplete.status = false
    } else {
        TestComplete.status = true;
    }
  });
  return TestComplete
}

// try {
//   const x = checkDices(process.argv.slice(2));
//   console.log('x',x)
// } catch (e) {
//   console.error(e);
//   process.exit(1);
// }
