const WebSocket = require('ws')
const BeatEmitter = require('../beat-emitter/BeatEmitter')

const server = new WebSocket.Server({host: 'localhost', port: 8080})

function handleWsEvents() {
    server.on('connection', socket => {
        console.log('New client connected')
        const beatEmitter = new BeatEmitter(120, 24, 4, beatEmitterCallback)
        beatEmitter.start(beatEmitterCallback)
        socket.on('close', () => {
            console.log('Client disconnected')
        })
    })
}

function beatEmitterCallback(type, counter) {
    server.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({type, counter}))
        }
    })
    console.log("BeatEmitter callback")
}

module.exports = { handleWsEvents }
