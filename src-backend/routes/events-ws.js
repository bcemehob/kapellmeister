const WebSocket = require('ws')
const BeatEmitter = require('../beat-emitter/BeatEmitter')
let beatEmitter = null
let server = null
setupWebSocket = (applicationAddress) => {
    server = new WebSocket.Server({
        host: applicationAddress.host,
        port: applicationAddress.wsPort
    })
    server.on('connection', socket => {
        console.log('New client connected')
        socket.on('message', handleClientMessage)
        socket.on('close', () => {
            console.log('Client disconnected')
        })
    })
}

handleClientMessage = messageStr => {
    const message = JSON.parse(messageStr)
    console.log("message received: ", message)
    switch (message.command) {
        case 'create':
            beatEmitter && beatEmitter.stop()
            createBeatEmitter(message)
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
            beatEmitter.resetPreroll(message.prerollBeats)
            sendMessageToClients('prerollBeats', message.prerollBeats)
            break
        case 'goToBeat':
            beatEmitter.goToBeat(message.currentBeat, message.tempo)
    }
}

createBeatEmitter = command => {
    beatEmitter = new BeatEmitter(command.tempo, command.duration, command.prerollBeats, sendMessageToClients)
}

sendMessageToClients = (type, value) => {
    server.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({type, value}))
        }
    })
}

module.exports = { setupWebSocket, sendMessageToClients }
