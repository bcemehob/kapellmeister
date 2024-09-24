const express = require('express')
const localAddress = require('./NetworkUtil')
const {setupWebSocket} = require('./routes/events-ws')

const patternHolder = {
    pattern: {
        name: 'new pattern',
        tempo: 120,
        duration: 128,
        measure: {
            base: 4,
            beats: 4
        },
        instruments: [
            {name: 'instrument 1', parties: []}
        ]
    }
}

module.exports = function (pathToStatic) {
    const app = express()
    const applicationAddress = {
        host: localAddress(),
        port: 3000,
        wsPort: 3001
    }
    console.log(__dirname)
    app.use(express.static(pathToStatic))
    app.use(function (req, res, next) {
        // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });

    setupWebSocket(applicationAddress)

    app.listen(applicationAddress.port, () => {
        console.log(`App is listening on http://${applicationAddress.host}:${applicationAddress.port}`)
    })

    app.get('/setup.js', (req, res) => {
        res.send(`window.applicationAddress = ${JSON.stringify(applicationAddress)}`)
    })

    app.get('/api/pattern', (req, res) => {
        res.send(JSON.stringify(patternHolder.pattern))
    })

}
