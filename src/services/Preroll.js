export class Preroll {
    tempo
    duration
    currentBeat = 0
    firstBeatTime = null
    intervalBetweenBeats
    playing = false

    constructor(tempo, duration) {
        this.tempo = tempo
        this.duration = duration
        this.intervalBetweenBeats = 60 * 1000 / this.tempo
    }

    start() {
        this.firstBeatTime = new Date().getTime()
        this.playing = true
    }

    stop() {
        this.playing = false
    }
}
