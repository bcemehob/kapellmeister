
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
            this.socket.addEventListener('message', event => this.handleMessage(event))
        })
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
        }
    }

}

export default ws
