const express = require('express')
const localAddress = require('./NetworkUtil')
const { setupWebSocket } = require('./routes/events-ws')

module.exports = function (pathToStatic) {
    const app = express()
    const applicationAddress = {
        host: localAddress(),
        port: 3000,
        wsPort: 3001
    }
    console.log(__dirname)
    app.use(express.static(pathToStatic))

    setupWebSocket(applicationAddress)

    app.listen(applicationAddress.port, () => {
        console.log(`App is listening on http://${applicationAddress.host}:${applicationAddress.port}`)
    })

    app.get('/setup.js', (req, res) => {
        res.send(`window.applicationAddress = ${JSON.stringify(applicationAddress)}`)
    })

}
