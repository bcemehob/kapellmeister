const express = require('express')
const localAddress = require('./NetworkUtil')
const { handleWsEvents } = require('./routes/events-ws')

module.exports = function (pathToStatic) {
    const app = express()
    const port = 3000
    console.log(__dirname)
    app.use(express.static(pathToStatic))

    handleWsEvents()

    app.listen(port, () => {
        console.log(`App is listening on http://${localAddress()}:${port}`);
    });
}
