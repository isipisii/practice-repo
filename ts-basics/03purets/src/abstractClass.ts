abstract class TakePhoto {
    constructor(
        public cameraMode: string,
        public filter: string
    ){}

    // putting an abstract keyword makes a specific compulsory or it should be used in its derived classs
    abstract getSepia(): void

    getReelTime(): number{
        return 8
    }
}

class Instagram extends TakePhoto {
    constructor(
        public cameraMode: string,
        public filter: string
    ){
        super(cameraMode, filter)
    }

    // overrides the method from abstract class
    // it should be
    getSepia(): void {
        console.log("Sepiaaaaa")
    }
}

const ig = new Instagram("asda", "asdad")

const reelTime: number = ig.getReelTime()