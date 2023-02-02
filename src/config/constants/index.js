const path = require('path');

const commands = require(path.resolve(__dirname, './commands'));

const constants = () => {
    return {
        commands: { ...commands },
    }
}

module.exports = constants();