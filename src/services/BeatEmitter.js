import {ConductorService} from "@/services/ConductorService";
import {Preroll} from "@/services/Preroll";

export class BeatEmitter {
    currentBeat = 0
    currentSecond = 0
    timeoutId = null
    secondTimeoutId = null
    intervalBetweenBeats = 0
    firstBeatTime = 0
    pausedBeat = 0
    pausedSecond = 0
    playing = false
    preroll

    constructor(tempo, duration, prerollBeats) {
        if (!tempo || !duration || isNaN(tempo) || isNaN(duration)) {
            throw new Error('Tempo and duration must be numbers')
        }
        this.tempo = tempo;
        this.duration = duration;
        this.intervalBetweenBeats = 60  * 1000 / this.tempo
        this.preroll = prerollBeats ? new Preroll(this.tempo, prerollBeats) : null
    }
    // parameters:
    // 1. Tempo (bpm)
    // 2. Length (Beats number)
    // emits events on each beat

    start(){
        if (this.preroll) this.preroll.start().then(() => this.startMain())
        else this.startMain()
    }

    startMain() {
        console.log("BeatEmitter started. Interval: ", this.intervalBetweenBeats);
        this.playing = true
        this.firstBeatTime = new Date().getTime()
        this.pausedBeat = this.currentBeat
        this.pausedSecond = this.currentSecond
        this.beat(this.firstBeatTime)
        this.second(this.firstBeatTime)
    }

    stop(){
        this.timeoutId && clearTimeout(this.timeoutId)
        this.timeoutId = null
        this.secondTimeoutId && clearTimeout(this.secondTimeoutId)
        this.secondTimeoutId = null
        this.currentBeat = 0
        this.pausedBeat = 0
        this.currentSecond = 0
        this.pausedSecond = 0
        this.playing = false
        this.preroll && this.resetPreroll(this.preroll.duration)
        console.log("BeatEmitter stopped");
    }

    pause(){
        this.timeoutId && clearTimeout(this.timeoutId)
        this.timeoutId = null
        this.secondTimeoutId && clearTimeout(this.secondTimeoutId)
        this.secondTimeoutId = null
        this.playing = false
        this.preroll && this.resetPreroll(this.preroll.duration)
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
    }

    second(secondTime) {
        if (!this.playing) return
        secondTime = secondTime || new Date().getTime()
        this.currentSecond++
        const expectedNextSecondTime = this.firstBeatTime + (this.currentSecond - this.pausedSecond) * 1000
        let nextSecondTimeout = expectedNextSecondTime - secondTime
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

    isPrerollPlaying() {
        return this.preroll && this.preroll.playing
    }
}
