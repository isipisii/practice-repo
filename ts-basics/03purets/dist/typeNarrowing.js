"use strict";
function detectType(val) {
    if (typeof val === "string") {
        return val.toLowerCase();
    }
    return val - 3;
}
function provideId(id) {
    if (!id) {
        console.log("Please provide your ID");
        return;
    }
    id.toLowerCase();
}
function printAll(strs) {
    if (strs) {
        if (typeof strs === "object") {
            for (const str of strs) {
                console.log(str);
            }
        }
        else if (typeof strs === "string") {
            console.log(strs);
        }
    }
}
// narrowing the proeprty
// usage of "in" keyword 
function isAdminAccount(account) {
    // to check if data from the arg has an admin property
    if ("isAdmin" in account) {
        return account.isAdmin;
    }
    return false;
}
