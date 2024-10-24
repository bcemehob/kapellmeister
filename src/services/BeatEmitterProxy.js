import {PrerollProxy} from "@/services/PrerollProxy"
import sse from "@/clients/Sse";


export class BeatEmitterProxy {
    currentBeat = 0
    currentSecond = 0
    preroll = null
    playing = false

    constructor(tempo, duration, prerollBeats) {
        this.id = new Date().getTime()
        this.tempo = tempo
        this.duration = duration
        this.preroll = prerollBeats ? new PrerollProxy(tempo, prerollBeats) : null
    }

    getCurrentPrerollBeat() {
        return this.preroll ? this.preroll.currentBeat : 0
    }

    isPrerollPlaying() {
        return this.preroll && this.preroll.currentBeat
    }

    start() {
        sse.send({command: 'start'})
    }

    pause() {
        sse.send({command: 'pause'})
    }

    stop() {
        sse.send({command: 'stop'})
        console.log("BeatEmitter stopped by user");
    }

    resetEmitter() {
        this.currentBeat = 0
        this.currentSecond = 0
        this.playing = false
        this.resetPreroll(this.preroll ? this.preroll.duration : 0)
        console.log('BeatEmitter stopped on the server')
    }

    resetPreroll(prerollBeats) {
        this.preroll = new PrerollProxy(this.tempo, prerollBeats)
        sse.send({command: 'resetPreroll', prerollBeats})
    }

    goToBeat(currentBeat, tempo) {
        sse.send({command: 'goToBeat', currentBeat, tempo})
    }
}
