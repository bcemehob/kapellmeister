
export class BeatEmitter {
    currentBeat = 0
    timeoutId
    intervalBetweenBeats = 0
    firstBeatTime = 0
    beatCallback
    constructor(tempo, duration, beatCallback) {
        if (!tempo || !duration || isNaN(tempo) || isNaN(duration)) {
            throw new Error('Tempo or duration must be a number')
        }
        if (!beatCallback || typeof beatCallback !== 'function') {
            throw new Error('Beat callback must be a function')
        }
        this.tempo = tempo;
        this.duration = duration;
        this.intervalBetweenBeats = 60  * 1000 / this.tempo
        this.beatCallback = beatCallback
    }
    // parameters:
    // 1. Tempo (bpm)
    // 2. Length (Beats number)
    // emits events on each beat




    start(){
        console.log("BeatEmitter started. Interval: ", this.intervalBetweenBeats);
        this.beat()
    }

    stop(){
        clearTimeout(this.timeoutId)
        this.currentBeat = 0
        console.log("BeatEmitter stopped");
    }

    pause(){
        clearTimeout(this.timeoutId)
        console.log("BeatEmitter paused");
    }

    beat() {
        let beatTime = new Date().getTime()
        if (this.currentBeat === 0) this.firstBeatTime = beatTime
        this.currentBeat++
        let expectedNextBeatTime = this.firstBeatTime + this.intervalBetweenBeats * this.currentBeat
        let nextBeatTimeout = expectedNextBeatTime - beatTime - 5

        if (this.currentBeat > this.duration) {
            this.stop()
            this.printMetrics(beatTime);
            return
        }
        let that = this
        this.beatCallback(this.currentBeat)
        this.timeoutId = setTimeout(() => that.beat(), nextBeatTimeout)

        console.log(`BeatEmitter beat #${this.currentBeat}, beat time: ${beatTime}, real time: ${new Date().getTime()}  interval: ${nextBeatTimeout}`);
    }


    printMetrics(beatTime) {
        console.log("Stop")
        console.log("First beat time: " + this.firstBeatTime)
        console.log("Last beat time: " + beatTime)
        console.log("End time: " + new Date().getTime())
    }

    static getInstance(tempo, duration, beatCallback) {
        return new BeatEmitter(tempo, duration, beatCallback)
    }
}
