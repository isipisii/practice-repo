function checkIfPalindrome(str) {
  const regEx = /[\W_]/g;  //  regex that will remove unecessary characters
  
  let lowStr = str.toLowerCase().replace(regEx, ""); // will lower case the str and remove the spaces
  let reverseStr = lowStr.split().reverse().join(""); // splitting the the string into an array of characters, reverse it and finally converting the array of characters into string

  if (lowStr === reverseStr) { 
    console.log(`${str} is palindrome`);
  } else console.log(`${str} is not palindrome`);
}

checkIfPalindrome("poop");
