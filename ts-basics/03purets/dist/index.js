"use strict";
// CLASSES IN TS
class User {
    constructor(email, name) {
        this.email = email;
        this.name = name;
    }
}
// shortest way of righting a class obj
class User1 {
    constructor(email, name) {
        this.email = email;
        this.name = name;
        this._courseCount = 1;
    }
    deleToken() {
        console.log("token deleted");
    }
    get getAppleEmail() {
        return `apple ${this.email}`;
    }
    get courseCount() {
        return this._courseCount;
    }
    set courseCount(courseNum) {
        if (courseNum <= 1) {
            throw new Error("course coutn should be more than one!");
        }
        this._courseCount = courseNum;
    }
}
class SubUser extends User1 {
    constructor() {
        super(...arguments);
        this.isFamily = true;
    }
    changeCourseCount() {
        this._courseCount = 4;
    }
}
// const ale = new User("alessandro", "alessandro")
