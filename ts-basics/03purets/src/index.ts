// CLASSES IN TS
class User {
    private email: string 
    private name: string

    constructor(email: string, name: string){
        this.email = email
        this.name = name
    }
}

// shortest way of righting a class obj
class User1 {

    protected _courseCount = 1
    constructor(
        public email: string, 
        public name: string
        ){
    }

    private deleToken(){
        console.log("token deleted")
    }

    get getAppleEmail(): string{
        return `apple ${this.email}`
    }

    get courseCount(): number{
        return this._courseCount
    }

    set courseCount(courseNum: number){
        if(courseNum <= 1){
            throw new Error("course coutn should be more than one!")
        }
        this._courseCount = courseNum
    }
}

class SubUser extends User1 {
    isFamily: boolean = true

    changeCourseCount() {
        this._courseCount = 4
    }
}
// const ale = new User("alessandro", "alessandro")