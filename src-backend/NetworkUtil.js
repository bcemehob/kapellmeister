const {networkInterfaces} = require('os')

module.exports = function () {
    const interfaces = getInterfaces()
    const netInterface = interfaces['en0'] || interfaces['WiFi']
    return netInterface ? netInterface[0] : 'unknown_address'
}

function getInterfaces() {
    const nets = networkInterfaces()
    const interfaces = {} // Or just '{}', an empty object

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
                if (!interfaces[name]) {
                    interfaces[name] = [];
                }
                interfaces[name].push(net.address);
            }
        }
    }
    return interfaces;
}
