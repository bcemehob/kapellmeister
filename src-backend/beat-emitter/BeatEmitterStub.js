class BeatEmitterStub {
    counter = 0
    start(callback) {
        console.log("Start BeatEmitter")
        this.beat(callback)
    }
    beat(callback){
        this.counter++
        callback("beat", this.counter)
        setTimeout(()=> {
            this.beat(callback)
        }, 1000)
    }
}
module.exports = BeatEmitterStub
