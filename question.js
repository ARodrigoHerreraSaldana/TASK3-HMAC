import readline from "readline";
export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//close method
export const close = function (response) {
    if (response == "x" || response == "X") {
      rl.close();
      process.exit(1);
    }
  };

//declare question using a promise
export const question = (question) => {
    return new Promise((resolve, reject) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  };

//get inside questionLoop until you put an acceptable value
export const questionLoop = async function(flag, questiontext,type)
{
      let response= ''
      while (!flag) {
          response = await question(questiontext);
          flag = wrongInput(response,type);
        }
        //close if user press x or X
        close(response);
        return response
}

//wrong Input
export const wrongInput = function (getData, type) {   
    let regex;
    if (type == 1) {
      regex = /[01xX?]+/g;
    } else {
      regex = /[0-5xX?]+/g;
    }
  
    if (!regex.test(getData)) {
      console.log("wrong input, those are not your options");
      return false;
    } else {
      return true;
    }
  }
  
