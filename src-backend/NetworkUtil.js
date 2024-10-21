const {get_active_interface} = require('network')
const util = require('util');

module.exports = () => {
    const getActiveInterface = util.promisify(get_active_interface)
    return getActiveInterface()
        .then(networkInterface => {
            return networkInterface.ip_address
        })
        .catch(err => {
            throw new Error(err)
        })
}
