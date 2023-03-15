//Problem: convert the small letters into their specific numberin the alphabet

function convertWordToNumber(input){
    let result = "";
    for (let i = 0; i < input.length; i++) {
        result += " " + (input.charCodeAt(i) - 96); // i used the ASCII since the 
      }
      return result;
}

console.log(convertWordToNumber("abcdefggijklmnopqrstuvwxyz"));