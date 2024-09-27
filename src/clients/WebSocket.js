
const ws = {
    socket: null,
    init: function(tempo, duration, prerollBeats) {
        this.socket = new WebSocket(`ws://${window.applicationAddress.host}:${window.applicationAddress.wsPort}`)
        this.socket.addEventListener('open', () => {
            const createEmitterCommand = {command: 'create', tempo, duration, prerollBeats}
            console.log('Connected to WebSocket server.')
            this.socket.send(JSON.stringify(createEmitterCommand))
        })
    },
    registerMessageListener: function(obj, methodName) {
        this.socket.addEventListener('message', event => obj[methodName](event))
    },
    send(command) {
        this.socket.send(JSON.stringify(command))
    }
}

export default ws
