"use strict";
class TakePhoto {
    constructor(cameraMode, filter) {
        this.cameraMode = cameraMode;
        this.filter = filter;
    }
    getReelTime() {
        return 8;
    }
}
class Instagram extends TakePhoto {
    constructor(cameraMode, filter) {
        super(cameraMode, filter);
        this.cameraMode = cameraMode;
        this.filter = filter;
    }
    // overrides the method from abstract class
    // it should be
    getSepia() {
        console.log("Sepiaaaaa");
    }
}
const ig = new Instagram("asda", "asdad");
const reelTime = ig.getReelTime();
