// array declaration
const superHeroes: string[] = ["ALe", "Ale"] 
const heroPower: Array<string> =[]

// superHeroes.forEach((superHero): void => console.log(superHero))

type User = {
    name: string
    isActive: false
}

// decalration with type
const allUsers: User[] = []
const users: Array<User> = []

allUsers.push({name: "Alessandro", isActive: false})

console.log(allUsers)

export {}