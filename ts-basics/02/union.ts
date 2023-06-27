let score: number | string = 33;

score = "Alessandro"
score = 20

type User = {
    name: string 
    id: number
}

type Admin = {
    username: string
    id: number
}

let ale: User | Admin = {
    name: "Alessandro",
    id: 123123
}

ale = {username: "isipisi", id: 334}

getDbid("AGAGAAAGAGGA")

function getDbid(id: string | number){
    if( typeof id === "string"){
        id.toLowerCase();
    }
    console.log(`Db id is ${id}`)
}


// array
const data: number[] = [1,2,3,4,5]

// array with 2 different types of element
const data1: (number | string)[] = [1,2,3,"asd",1, "hjaha"]

export {}