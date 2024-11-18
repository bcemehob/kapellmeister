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
    const candidates = Object.values(networkInterfaces())
        .flat()
        .filter(netInterface => netInterface.family === 'IPv4' && !netInterface.internal)
    let result = candidates.filter(candidate => candidate.address.startsWith('192.168'))
    if (result.length) return result
    for (let i = 16; i < 32; i++) {
        result = candidates.filter(candidate => candidate.address.startsWith(`172.${i}`))
        if (result.length) return result
    }
    return candidates.filter(candidate => candidate.address.startsWith('10.'))
}
