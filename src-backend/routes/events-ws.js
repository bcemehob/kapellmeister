const WebSocket = require('ws')
const BeatEmitter = require('../beat-emitter/BeatEmitter')
const server = new WebSocket.Server({host: 'localhost', port: 8080})
let beatEmitter = null
handleWsEvents = () => {
    server.on('connection', socket => {
        console.log('New client connected')
        socket.on('message', handleClientMessage)
        socket.on('close', () => {
            console.log('Client disconnected')
        })
    })
}

handleClientMessage = commandString => {
    const command = JSON.parse(commandString)
    console.log("command received: ", command)
    switch (command.command) {
        case 'create':
            createBeatEmitter(command)
            break
        case 'start':
            beatEmitter.start()
            break
        case 'stop':
            beatEmitter.stop()
            break
        case 'pause':
            beatEmitter.pause()
            break
        case 'resetPreroll':
            beatEmitter.resetPreroll(command.prerollBeats)
    }
}

createBeatEmitter = command => {
    beatEmitter = new BeatEmitter(command.tempo, command.duration, command.prerollBeats, beatEmitterCallback)
}

beatEmitterCallback = (type, value) => {
    server.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({type, value}))
        }
    })
    console.log("BeatEmitter callback")
}

module.exports = { handleWsEvents }
