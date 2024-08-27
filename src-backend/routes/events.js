const sockets = []
let eventsCount = 0
let currentTimeoutId = null
function addEventsRoute(app) {
    app.get('/events', createSocketConnection)
    console.log("events route added")
    sendMessageToAllClients()
}

function createSocketConnection(req, res) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
    }
    res.writeHead(200, headers)
    res.write('aaaa')
    const clientNr = sockets.length + 1
    sockets.push({clientName: `client ${clientNr}`, response: res, data: `data: ${clientNr}`})
    console.log(`New connection established: ${clientNr}`)
}

function sendMessageToAllClients() {
    if (!sockets.length) console.log("no clients yet")
    else console.log(`sending event ${++eventsCount}`)

    sockets.forEach(socket => {
        const payload = `${socket.clientName }, event ${eventsCount} at ${new Date().getTime()}`
        socket.response.write(`data: message ${payload}\n\n`);
    })
    clearTimeout(currentTimeoutId)
    currentTimeoutId = setTimeout(sendMessageToAllClients, 1000)
}

module.exports = { addEventsRoute }


