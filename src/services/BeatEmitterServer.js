
const socket = new WebSocket('ws://localhost:8080');


export class BeatEmitterServer {
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
        console.log(createEmitterCommand)
        socket.addEventListener('open', () => {
            console.log('Connected to WebSocket server.')
            socket.send(JSON.stringify(createEmitterCommand))
        })
        const handleMessage = this.handleMessage
        const beatEmitter = this
        socket.addEventListener('message', evt => {handleMessage(evt, beatEmitter)})
        const that = this
        setTimeout(function () {
            that.setCurrentBeat(222)
        }, 1000)
        console.log(that)
    }

    getCurrentPrerollBeat() {
        return 0
    }

    isPrerollPlaying() {
        return false
    }

    start() {
        socket.send(JSON.stringify({command: 'start'}))
        this.wsMessage = ''
    }

    resetPreroll(prerollBeats) {
        socket.send(JSON.stringify({command: 'resetPreroll', prerollBeats}))
    }

    setPlaying(val) {
        console.log("PLAYING:", val)
        this.playing = val
    }

    setCurrentBeat(val) {
        this.id=new Date().getTime()
        this.currentBeat = val
    }

    setCurrentSecond(val) {
        this.currentSecond = val
    }

    handleMessage(event, beatEmitter) {
        const msg = JSON.parse(event.data)
        console.log(beatEmitter)
        switch (msg.type) {
            case 'preroll' :
                beatEmitter.prerollBeats = msg.value
                break
            case 'beat' :
                beatEmitter.setCurrentBeat(msg.value)
                break
            case 'second' :
                beatEmitter.setCurrentSecond(msg.value)
                break
            case 'playing' :
                beatEmitter.setPlaying(msg.value)
                break
        }
    }
}
