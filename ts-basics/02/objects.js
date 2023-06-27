"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = {
    name: "Alessandro Benig",
    email: "ale@gmail.com",
    isActive: false
};
function createUser(_a) {
    var string = _a.name, boolean = _a.isPaid;
}
createUser({ name: "adsasd", isPaid: false });
// this function returns an obj and each property has a type
function createCourse() {
    return {
        courseCode: "BSIT",
        tuitionFee: 30000
    };
}
