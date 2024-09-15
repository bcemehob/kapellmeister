const socket = new WebSocket('ws://localhost:8080');


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
        this.preroll = prerollBeats ? {tempo, prerollBeats, currentBeat: 0} : null
        const createEmitterCommand = {command: 'create', tempo, duration, prerollBeats}
        socket.addEventListener('open', () => {
            console.log('Connected to WebSocket server.')
            socket.send(JSON.stringify(createEmitterCommand))
        })
    }

    getCurrentPrerollBeat() {
        return 0
    }

    isPrerollPlaying() {
        return false
    }

    start() {
        const emitter = this
        socket.addEventListener('message',  event => emitter.handleMessage(event))
        socket.send(JSON.stringify({command: 'start'}))
    }

    pause() {
        socket.send(JSON.stringify({command: 'pause'}))
    }

    stop() {
        socket.send(JSON.stringify({command: 'stop'}))
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
        socket.send(JSON.stringify({command: 'resetPreroll', prerollBeats}))
    }

    handleMessage(event) {
        const msg = JSON.parse(event.data)
        console.log('Current beat', this.currentBeat)
        switch (msg.type) {
            case 'preroll' :
                this.prerollBeats = msg.value
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
