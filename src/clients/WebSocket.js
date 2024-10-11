const ws = {
    socket: null,
    beatEmitter: null,
    patternCallback: null,
    prerollCallback: null,
    init(beatEmitter) {
        this.beatEmitter = beatEmitter
        this.socket = new WebSocket(`ws://${window.applicationAddress.host}:${window.applicationAddress.wsPort}`)
        this.socket.addEventListener('open', () => {
            console.log('Connected to WebSocket server.', this.beatEmitter)
            this.setBeatEmitter()
            this.socket.addEventListener('message', event => this.handleMessage(event))
        })
    },
    setBeatEmitter() {
        console.log("BE duration:", this.beatEmitter.duration)
        const createEmitterCommand = {
            command: 'create',
            tempo: this.beatEmitter.tempo,
            duration: this.beatEmitter.duration,
            prerollBeats: this.beatEmitter.prerollBeats
        }
        this.socket.send(JSON.stringify(createEmitterCommand))
    },
    setup(beatEmitter, patternCallback, prerollCallback) {
        this.patternCallback = patternCallback
        this.prerollCallback = prerollCallback
        if (this.socket) {
            this.beatEmitter = beatEmitter
            if (this.socket.readyState === WebSocket.OPEN) this.setBeatEmitter()
        } else this.init(beatEmitter)

    },
    send(command) {
        this.socket.send(JSON.stringify(command))
    },
    handleMessage(event) {
        const msg = JSON.parse(event.data)
        console.log('Message:', msg.type, this.beatEmitter.currentBeat)
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

export default ws
