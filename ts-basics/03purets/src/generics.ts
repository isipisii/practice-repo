
// in this function it only accepts number and returns a number 
function identityOne(val: number): number {
    return val
}

// in this function, using any keyword is that it accepts different types, and it can return any type too
function identityTwo(val: any): any{
    return val
}


// when using generics, whatever type of the data coming from the argument is, will always be the type of its return type. ex the argument is number then type of return is automatically a number
function identityThree<T>(val: T): T{
    return val
}


// identityThree(3)

interface Milk {
    brandName: string
    quantity: number
}

const melk = identityThree<Milk>({brandName: "Bear Brand", quantity: 5 })
console.log(melk)


// generics in arrow function with array parameter and return type
const getSearchProducts = <T>(val: T[]): T[] => {
    return val
}
