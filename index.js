const express = require ('express')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
app.get('/setup.js', (req, res) => {
    res.send(`window.conductor = true`)
})
