const socket = new WebSocket('ws://localhost:8080');
socket.addEventListener('open', () => {
    console.log('Connected to WebSocket server.')
})


export class BeatEmitterServer {
    currentBeat = 0
    currentSecond = 0
    preroll = {}
    constructor(tempo, duration, prerollBeats) {
        this.tempo = tempo
        this.duration = duration
        this.prerollBeats = prerollBeats
        socket.addEventListener('message', (event) => {
            const msg = JSON.parse(event.data)
            console.log(msg, event.data)
            switch (msg.type) {
                case 'preroll' :
                    console.log('preroll: ', msg.counter)
                    break
                case 'beat' :
                    console.log('beat: ', msg.counter)
                    break
                case 'second' :
                    console.log('second: ', msg.counter)
                    break
            }
        })
    }

    getCurrentPrerollBeat() {
        return 0
    }

    isPrerollPlaying() {
        return false
    }

    start() {
        socket.send(JSON.stringify({text: 'start'}))
        this.wsMessage = ''

    }
}
