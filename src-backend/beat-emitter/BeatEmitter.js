class BeatEmitter {
    counter = 0
    start(callback) {
        console.log("Start BeatEmitter")
        this.beat(callback)
    }
    beat(callback){
        const bt = new Date().getTime()
        this.counter++
        callback("beat", this.counter)
        setTimeout(()=> {
            this.beat(callback)
        }, 1000)
    }
}
module.exports = BeatEmitter
