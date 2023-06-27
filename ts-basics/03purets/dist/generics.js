"use strict";
// in this function it only accepts number and returns a number 
function identityOne(val) {
    return val;
}
// in this function, using any keyword is that it accepts different types, and it can return any type too
function identityTwo(val) {
    return val;
}
// when using generics, whatever type of the data coming from the argument is, will always be the type of its return type. ex the argument is number then type of return is automatically a number
function identityThree(val) {
    return val;
}
const melk = identityThree({ brandName: "Bear Brand", quantity: 5 });
console.log(melk);
// generics in arrow function with array parameter and return type
const getSearchProducts = (val) => {
    return val;
};
