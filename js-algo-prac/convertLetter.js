//Problem: convert the small letters into their specific numberin the alphabet

// i used the ASCII to get the numeric value of each letter and subtracted it to 96 since small letter a's value is 97 and so forth
function convertWordToNumber(input){
    let result = "";
    for (let i = 0; i < input.length; i++) {
        result += " " + (input.charCodeAt(i) - 96); 
      }
      return result;
}
console.log(convertWordToNumber("abcdefggijklmnopqrstuvwxyz"));