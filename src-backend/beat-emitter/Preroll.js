module.exports = class Preroll {
    tempo
    duration
    currentBeat = 0
    firstBeatTime = null
    intervalBetweenBeats
    playing = false
    timeoutId = null
    callback = null

    constructor(tempo, duration, callback) {
        this.tempo = tempo
        this.duration = duration
        this.intervalBetweenBeats = 60 * 1000 / this.tempo
        this.callback = callback
    }

    start() {
        this.firstBeatTime = new Date().getTime()
        console.log("Preroll started. Interval: ", this.intervalBetweenBeats)
        this.playing = true
        this.callback('prerollPlaying', true)
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
        this.callback('prerollBeat', this.currentBeat)
        let that = this
        this.timeoutId = setTimeout(() => that.beat(resolve), nextBeatTimeout)
    }
}
