const path = require('path');

const constants = () => {
    return {
        commands: require(path.resolve(__dirname, './commands')),
    }
}

module.exports = constants();