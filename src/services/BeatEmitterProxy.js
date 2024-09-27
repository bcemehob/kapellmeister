import {PrerollProxy} from "@/services/PrerollProxy"
import ws from "@/clients/WebSocket";


export class BeatEmitterProxy {
    currentBeat = 0
    currentSecond = 0
    preroll = null
    playing = false

    constructor(tempo, duration, prerollBeats) {
        this.id = new Date().getTime()
        this.tempo = tempo
        this.duration = duration
        this.prerollBeats = prerollBeats
        this.preroll = prerollBeats ? new PrerollProxy(tempo, prerollBeats) : null
        console.log("BE construct")
        ws.init(tempo, duration, prerollBeats)
    }

    getCurrentPrerollBeat() {
        return this.preroll ? this.preroll.currentBeat : 0
    }

    isPrerollPlaying() {
        return this.preroll && this.preroll.currentBeat
    }

    start() {
        ws.registerMessageListener(this, 'handleMessage')
        ws.send({command: 'start'})
    }

    pause() {
        ws.send({command: 'pause'})
    }

    stop() {
        ws.send({command: 'stop'})
        console.log("BeatEmitter stopped by user");
    }

    resetEmitter() {
        this.currentBeat = 0
        this.currentSecond = 0
        this.playing = false
        this.resetPreroll(this.prerollBeats)
        console.log('BeatEmitter stopped on the server')
    }

    resetPreroll(prerollBeats) {
        this.preroll = new PrerollProxy(this.tempo, prerollBeats)
        ws.send({command: 'resetPreroll', prerollBeats})
    }

    goToBeat(currentBeat, tempo) {
        ws.registerMessageListener(this, 'handleMessage')
        ws.send({command: 'goToBeat', currentBeat, tempo})
    }

    handleMessage(event) {
        const msg = JSON.parse(event.data)
        console.log('Message:', msg.type, this.currentBeat)
        switch (msg.type) {
            case 'prerollBeat' :
                if (this.preroll) this.preroll.beat(msg.value)
                break
            case 'beat' :
                this.currentBeat = msg.value
                break
            case 'second' :
                this.currentSecond = msg.value
                break
            case 'playing' :
                this.playing = msg.value
                break
            case 'stop' :
                this.resetEmitter()
        }
    }
}
