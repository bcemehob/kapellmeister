const {networkInterfaces} = require('os')

module.exports = function () {
    const foundInterface = findInterfaceWithIpV4LocalNetworkAddress()
    if (!foundInterface) {
        throw new Error("Not found local ip for incoming connections. Check your network preferences")
    }
    return foundInterface.address
}

function findInterfaceWithIpV4LocalNetworkAddress() {
    return Object.values(networkInterfaces())
        .flat()
        .find(netInterface => netInterface.family === 'IPv4' && !netInterface.internal)
}
