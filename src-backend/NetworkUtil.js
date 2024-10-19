const {networkInterfaces} = require('os')

module.exports = () => {
    const foundInterfaces = findInterfaceWithIpV4LocalNetworkAddress()
    if (!foundInterfaces.length) {
        throw new Error("Not found local ip for incoming connections. Check your network preferences")
    }
    console.log("available hosts: ", foundInterfaces.map(fi => fi.address))
    return foundInterfaces[0].address
}

function findInterfaceWithIpV4LocalNetworkAddress() {
    return Object.values(networkInterfaces())
        .flat()
        .filter(netInterface => netInterface.famidly === 'IPv4' && !netInterface.internal)
}
