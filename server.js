
const express = require('express')
const path = require('path')
const localAddress = require('./src-backend/NetworkUtil')
const { addEventsRoute } = require('./src-backend/routes/events')

const app = express()
const port = 3000
app.use(express.static(path.join(__dirname, 'static')))

addEventsRoute(app)

app.listen(port, () => {
    console.log(`App is listening on http://${localAddress()}:${port}`);
});


