const WebSocket = require('ws')


const server = new WebSocket.Server({host: 'localhost', port: 8080})

function handleWsEvents() {
    server.on('connection', socket => {
        console.log('New client connected')
        socket.on('message', msg => {
            console.log('received message:', JSON.parse(msg))
            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(msg.toString())
                }
            })
        })
        socket.on('close', () => {
            console.log('Client disconnected')
        })

    })
}


module.exports = { handleWsEvents }


