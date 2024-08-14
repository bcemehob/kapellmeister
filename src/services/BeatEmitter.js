import {ConductorService} from "@/services/ConductorService";
import {Preroll} from "@/services/Preroll";

export class BeatEmitter {
    currentBeat = 0
    currentSecond = 0
    timeoutId = null
    secondTimeoutId = null
    intervalBetweenBeats = 0
    firstBeatTime = 0
    preroll
    prerollTimeoutId = null

    constructor(tempo, duration, prerollBeats) {
        if (!tempo || !duration || isNaN(tempo) || isNaN(duration)) {
            throw new Error('Tempo and duration must be numbers')
        }
        this.tempo = tempo;
        this.duration = duration;
        this.intervalBetweenBeats = 60  * 1000 / this.tempo
        this.playing = false
        this.pausedBeat = 0
        this.pausedSecond = 0
        this.preroll = prerollBeats ? new Preroll(this.tempo, prerollBeats) : null
    }
    // parameters:
    // 1. Tempo (bpm)
    // 2. Length (Beats number)
    // emits events on each beat

    start(){
        if (this.preroll && this.preroll.currentBeat === 0) {
            this.preroll.firstBeatTime = new Date().getTime()
            console.log("Preroll started. Interval: ", this.preroll.intervalBetweenBeats)
            this.prerollStart()
            return
        }
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
        this.currentSecond = 0
        this.playing = false
        this.preroll && this.resetPreroll(this.preroll.duration)
        console.log("BeatEmitter stopped");
    }

    pause(){
        clearTimeout(this.timeoutId)
        clearTimeout(this.secondTimeoutId)
        this.playing = false
        this.resetPreroll(this.preroll.duration)
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

    prerollStart() {
        this.preroll.firstBeatTime = new Date().getTime()
        this.prerollBeat()
    }

    prerollStop(){
        clearTimeout(this.prerollTimeoutId)
        this.playing = false
        this.start()
    }

    prerollBeat() {
        this.preroll.currentBeat++
        const expectedNextBeatTime = this.preroll.firstBeatTime + this.preroll.intervalBetweenBeats * this.preroll.currentBeat
        let nextBeatTimeout = expectedNextBeatTime - new Date().getTime() - 5
        if (this.preroll.currentBeat > this.preroll.duration) {
            this.prerollStop()
            return
        }
        let that = this
        this.prerollTimeoutId = setTimeout(() => that.prerollBeat(), nextBeatTimeout)
    }

    second(secondTime) {
        secondTime = secondTime || new Date().getTime()
        this.currentSecond++
        // console.log("currentSecond added", this.currentSecond)
        const expectedNextSecondTime = this.firstBeatTime + (this.currentSecond - this.pausedSecond) * 1000
        let nextSecondTimeout = expectedNextSecondTime - secondTime
        // console.log("next second timeout", nextSecondTimeout)
        if (this.currentSecond > ConductorService.calculateDuration(this.duration, this.tempo)) {
            this.stop()
            this.printMetrics(secondTime);
            return
        }
        let that = this
        this.secondTimeoutId = setTimeout(() => that.second(), nextSecondTimeout)
    }

    resetPreroll(prerollBeats) {
        this.preroll = new Preroll(this.tempo, prerollBeats)
    }

    printMetrics(beatTime) {
        console.log("Stop")
        console.log("First beat time: " + this.firstBeatTime)
        console.log("Last beat time: " + beatTime)
        console.log("End time: " + new Date().getTime())
    }

    goToBeat(currentBeat, tempo) {
        const isPlaying = this.playing
        this.stop()
        this.currentBeat = currentBeat
        this.currentSecond = ConductorService.calculateDuration(currentBeat, tempo).seconds
        if (!isPlaying) this.pause()
        else this.start()
    }

    getCurrentPrerollBeat() {
        return this.preroll ? this.preroll.currentBeat : 0
    }
}
