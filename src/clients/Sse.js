import {HttpClient} from "@/clients/HttpClient";

const sse = {
    client: new EventSource(`http://${window.applicationAddress.host}:${window.applicationAddress.port}/stream`),
    beatEmitter: null,
    patternCallback: null,
    prerollCallback: null,
    init() {
        this.client.onmessage = e => {
            console.log('received', e)
            this.handleMessage(e)
        }
    },
    setupEmitterAndCallbacks(beatEmitter, patternCallback, prerollCallback) {
        this.beatEmitter = beatEmitter
        this.patternCallback = patternCallback
        this.prerollCallback = prerollCallback
        this.setBeatEmitter()
    },
    setBeatEmitter() {
        const createEmitterCommand = {
            command: 'create',
            tempo: this.beatEmitter.tempo,
            duration: this.beatEmitter.duration,
            prerollBeats: this.beatEmitter.prerollBeats
        }
        HttpClient.sendMessageToBackend(createEmitterCommand)
    },

    send(command) {
        HttpClient.sendMessageToBackend(command)
    },

    handleMessage(event) {
        const msg = JSON.parse(event.data)
        switch (msg.type) {
            case 'prerollBeat' :
                if (this.beatEmitter.preroll) this.beatEmitter.preroll.beat(msg.value)
                break
            case 'beat' :
                this.beatEmitter.currentBeat = msg.value
                break
            case 'second' :
                this.beatEmitter.currentSecond = msg.value
                break
            case 'playing' :
                this.beatEmitter.playing = msg.value
                break
            case 'stop' :
                this.beatEmitter.resetEmitter()
                break
            case 'pattern' :
                this.patternCallback(msg.value)
                break
            case 'prerollBeats':
                this.prerollCallback(msg.value)
                break
        }
    }
}

export default sse
