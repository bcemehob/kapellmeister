export class Preroll {
    tempo
    duration
    currentBeat = 0
    firstBeatTime = null
    playing = false
    timeoutId = null

    constructor(tempo, duration, socket) {
        this.tempo = tempo
        this.duration = duration
        this.socket = socket
    }

    start() {
        this.socket.send(JSON.stringify({command: 'startPreroll'}))
        this.playing = true
    }

    beat(value) {
        this.currentBeat = value
    }

    stop() {
        this.playing = false
    }
}
