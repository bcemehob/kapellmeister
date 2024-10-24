const {v4: uuidv4} = require('uuid')
const BeatEmitter = require("../beat-emitter/BeatEmitter");
let beatEmitter = null

let clients = []

setupClientEventStream = response => {
    response.writeHead(200, {
        'Content-Type': "text/event-stream",
        'Cache-Control': "no-cache",
        'Connection': "keep-alive",
        'Access-Control-Allow-Origin': "*"
    });
    const client = {id: uuidv4(), response}
    clients.push(client)
    console.log(`new client connected: ${client.id}`)
    sendMessageToClients('new_client', client.id)
    sendPrerollBeatsToClient(client)
    response.on('close', () => {
        clients = clients.filter(clnt => client.id !== clnt.id)
        response.end();
    });
}

sendPrerollBeatsToClient = client => {
    beatEmitter && beatEmitter.preroll.duration &&
    sendMessageToClient(client, {type: 'prerollBeats', value: beatEmitter.preroll.duration})
}

handleClientMessage = message => {
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

sendMessageToClients = (type, value) => {
    clients.forEach(client => sendMessageToClient(client, {type, value}))
}

sendMessageToClient = (client, message) => {
    client.response.write('event: message\n');
    client.response.write(`data: ${JSON.stringify(message)} \n\n`)
}

createBeatEmitter = command => {
    beatEmitter = new BeatEmitter(command.tempo, command.duration, command.prerollBeats, sendMessageToClients)
}


module.exports = {setupClientEventStream, sendMessageToClients, handleClientMessage}

