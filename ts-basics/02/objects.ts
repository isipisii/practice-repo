// const User = {
//     name: "Alessandro Benig",
//     email: "ale@gmail.com",
//     isActive: false
// }

// type aliases
// THIS CAN BE USED IN MULTIPLE FUNCTIONS 
type User ={
    // readonly cannot be modified of changed
    readonly _id: string
    name: string
    email: string
    isActive: boolean
    //the quesetion mark says that it's optional, creditCardDetails is not necessary
    creditCardDetails?: number
}

let myUser: User = {
    _id: "1234",
    name: "akessasd",
    email: "agagagag",
    isActive: false
}

// cannot assign to '_id' because it is a read-only property.
// myUser._id = "213"

// function createUser(user: User): User{
//     return user
// } 

// createUser({name: "", email: "", isActive: true})

// createUser({name: "adsasd", isPaid: false})

// this function returns an obj and each property has a type
// function createCourse(): {courseCode: string, tuitionFee: number}{
//     return{
//         courseCode: "BSIT",
//         tuitionFee: 30000
//     }
// }
export{}