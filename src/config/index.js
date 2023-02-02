const path = require('path');

const { deepFreezeObject } = require(path.resolve(__dirname, '..', 'models/helpers'));

const botsConfig = require(path.resolve(__dirname, '..', 'config/bot'));

const config = () => {
    return deepFreezeObject({
        errors: {
            internal: { message: "Internal server error", code: 500 }
        },
        bots: { ...botsConfig }
    });
}

module.exports = config();