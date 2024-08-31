const startApp = require('./src-backend/app')
const pathToStatic = require('path').join(__dirname, 'dist')
startApp(pathToStatic)
