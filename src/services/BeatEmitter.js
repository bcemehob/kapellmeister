
export class BeatEmitter {
    currentBeat = 0
    currentSecond = 0
    timeoutId
    secondTimeoutId
    intervalBetweenBeats = 0
    firstBeatTime = 0
    constructor(tempo, duration) {
        if (!tempo || !duration || isNaN(tempo) || isNaN(duration)) {
            throw new Error('Tempo or duration must be a number')
        }
        this.tempo = tempo;
        this.duration = duration;
        this.intervalBetweenBeats = 60  * 1000 / this.tempo
        this.playing = false
        this.pausedBeat = 0
        this.pausedSecond = 0
    }
    // parameters:
    // 1. Tempo (bpm)
    // 2. Length (Beats number)
    // emits events on each beat

    start(){
        console.log("BeatEmitter started. Interval: ", this.intervalBetweenBeats);
        this.firstBeatTime = new Date().getTime()
        this.pausedBeat = this.currentBeat
        this.pausedSecond = this.currentSecond
        this.beat(this.firstBeatTime)
        this.second(this.firstBeatTime)
        this.playing = true
    }

    stop(){
        clearTimeout(this.timeoutId)
        clearTimeout(this.secondTimeoutId)
        this.currentBeat = 0
        this.playing = false
        console.log("BeatEmitter stopped");
    }

    pause(){
        clearTimeout(this.timeoutId)
        clearTimeout(this.secondTimeoutId)
        this.playing = false
        console.log("BeatEmitter paused");
    }

    beat(beatTime) {
        beatTime = beatTime || new Date().getTime()
        this.currentBeat++
        const expectedNextBeatTime = this.firstBeatTime + this.intervalBetweenBeats * (this.currentBeat - this.pausedBeat)
        let nextBeatTimeout = expectedNextBeatTime - beatTime - 5
        if (this.currentBeat > this.duration) {
            this.stop()
            this.printMetrics(beatTime);
            return
        }
        let that = this
        this.timeoutId = setTimeout(() => that.beat(), nextBeatTimeout)

        // console.log(`BeatEmitter beat #${this.currentBeat}, beat time: ${beatTime}, real time: ${new Date().getTime()}  interval: ${nextBeatTimeout}`);
    }

    second(secondTime) {
        secondTime = secondTime || new Date().getTime()
        this.currentSecond++
        // console.log("currentSecond added", this.currentSecond)
        const expectedNextSecondTime = this.firstBeatTime + (this.currentSecond - this.pausedSecond) * 1000
        let nextSecondTimeout = expectedNextSecondTime - secondTime
        // console.log("next second timeout", nextSecondTimeout)
        if (this.currentSecond > this.duration * (this.intervalBetweenBeats - this.pausedSecond) / 1000) {
            this.stop()
            this.printMetrics(secondTime);
            return
        }
        let that = this
        this.secondTimeoutId = setTimeout(() => that.second(), nextSecondTimeout)
    }

    printMetrics(beatTime) {
        console.log("Stop")
        console.log("First beat time: " + this.firstBeatTime)
        console.log("Last beat time: " + beatTime)
        console.log("End time: " + new Date().getTime())
    }
}
