export class Preroll {
    tempo
    duration
    currentBeat = 0
    firstBeatTime = null
    intervalBetweenBeats
    playing = false
    timeoutId = null

    constructor(tempo, duration) {
        this.tempo = tempo
        this.duration = duration
        this.intervalBetweenBeats = 60 * 1000 / this.tempo
    }

    start() {
        this.firstBeatTime = new Date().getTime()
        console.log("Preroll started. Interval: ", this.intervalBetweenBeats)
        this.playing = true
        const that = this
        return new Promise(resolve => that.beat(resolve))
    }

    beat(resolve) {
        this.currentBeat++
        const expectedNextBeatTime = this.firstBeatTime + this.intervalBetweenBeats * this.currentBeat
        let nextBeatTimeout = expectedNextBeatTime - new Date().getTime() - 5
        if (this.currentBeat > this.duration) {
            clearTimeout(this.timeoutId)
            this.playing = false
            return resolve()
        }
        let that = this
        this.timeoutId = setTimeout(() => that.beat(resolve), nextBeatTimeout)
    }
}
