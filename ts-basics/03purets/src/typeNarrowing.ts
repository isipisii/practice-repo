function detectType(val: string | number){
    if(typeof val === "string"){
        return val.toLowerCase()
    }
    return val - 3
}

function provideId(id: string | null){
    if(!id){
        console.log("Please provide your ID")
        return
    }

    id.toLowerCase()
}

function printAll(strs: string | string[] | null){
    
    if(strs){
        if(typeof strs === "object"){
            for(const str of strs){
                console.log(str)
            }
        } else if (typeof strs === "string"){
            console.log(strs)
        }
    }
}

interface User1 {
    name: string
    email: string
}

interface Admin {
    name: string
    email: string
    isAdmin: boolean
}

// narrowing the proeprty
// usage of "in" keyword 

function isAdminAccount(account: User1 | Admin){
    // to check if data from the arg has an admin property
    if ("isAdmin" in account){
        return account.isAdmin
    }
    return false

}
