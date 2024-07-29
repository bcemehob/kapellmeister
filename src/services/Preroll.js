export class Preroll {
    duration
    currentBeat = 0
    firstBeatTime
    intervalBetweenBeats

    constructor(tempo, duration) {
        this.tempo = tempo
        this.duration = duration
        this.intervalBetweenBeats = 60 * 1000 / this.tempo
    }
}
