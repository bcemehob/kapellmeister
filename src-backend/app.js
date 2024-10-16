const express = require('express')
const localAddress = require('./NetworkUtil')
const {setupWebSocket, sendMessageToClients} = require('./routes/events-ws')
const patternHolder = require("./PatternHolder");
const open = require('open');

module.exports = function (pathToStatic) {
    const app = express()
    const applicationAddress = {
        host: localAddress(),
        port: 3000,
        wsPort: 3001
    }
    console.log(__dirname)
    app.use(express.json())
    app.use(express.static(pathToStatic))
    app.use(function (req, res, next) {
        // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });

    setupWebSocket(applicationAddress)

    app.listen(applicationAddress.port, () => {
        const appUrl = `http://${applicationAddress.host}:${applicationAddress.port}`
        console.log(`App is listening on ${appUrl}`)
        open(appUrl)
    })

    app.get('/setup.js', (req, res) => {
        const ip = req.ip.split('::ffff:')[1]
        const conductor = ip === applicationAddress.host
        res.send(`window.applicationAddress = ${JSON.stringify(applicationAddress)}\nwindow.conductor = ${conductor}`)
    })

    app.get('/api/pattern', (req, res) => {
        res.send(JSON.stringify(patternHolder.pattern))
    })

    app.post('/api/pattern', (req, res) => {
        patternHolder.pattern = req.body
        res.send(JSON.stringify({answer: 'OK'}))
        sendMessageToClients('pattern', JSON.stringify(req.body))
    })

}
