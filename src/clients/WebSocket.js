
const ws = {
    socket: null,
    beatEmitter: null,
    init: function(beatEmitter) {
        if (this.socket) {
            console.log("ws already init")
            return
        }
        this.beatEmitter = beatEmitter
        this.socket = new WebSocket(`ws://${window.applicationAddress.host}:${window.applicationAddress.wsPort}`)
        this.socket.addEventListener('open', () => {
            console.log('Connected to WebSocket server.')
            const createEmitterCommand = {
                command: 'create',
                tempo: this.beatEmitter.tempo,
                duration: this.beatEmitter.duration,
                prerollBeats: this.beatEmitter.prerollBeats
            }
            this.socket.send(JSON.stringify(createEmitterCommand))
            this.registerMessageListener(this.beatEmitter)
        })
    },
    registerMessageListener: function(emitter) {
        this.socket.addEventListener('message', event => this.handleMessage(emitter, event))
    },
    send(command) {
        this.socket.send(JSON.stringify(command))
    },
    handleMessage(beatEmitter, event) {
        const msg = JSON.parse(event.data)
        console.log('Message:', msg.type, beatEmitter.currentBeat)
        switch (msg.type) {
            case 'prerollBeat' :
                if (beatEmitter.preroll) beatEmitter.preroll.beat(msg.value)
                break
            case 'beat' :
                beatEmitter.currentBeat = msg.value
                break
            case 'second' :
                beatEmitter.currentSecond = msg.value
                break
            case 'playing' :
                beatEmitter.playing = msg.value
                break
            case 'stop' :
                beatEmitter.resetEmitter()
        }
    }

}

export default ws
