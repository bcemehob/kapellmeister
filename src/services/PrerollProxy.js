export class PrerollProxy {
    tempo
    duration
    currentBeat = 0
    firstBeatTime = null
    playing = false
    timeoutId = null

    constructor(tempo, duration) {
        this.tempo = tempo
        this.duration = duration
    }

    beat(value) {
        this.currentBeat = value
    }

    stop() {
        this.playing = false
    }
}
