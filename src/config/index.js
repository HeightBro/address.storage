const path = require('path');

const { deepFreezeObject } = require(path.resolve(__dirname, '..', 'models/helpers'));

const botsConfig = require(path.resolve(__dirname, 'bot'));
const processConfig = require(path.resolve(__dirname, 'process'));
const firebaseConfig = require(path.resolve(__dirname, 'database/firebase'));
const constants = require(path.resolve(__dirname, 'constants'));

const config = () => {
    return deepFreezeObject({
        errors: {
            internal: { message: "Internal server error", code: 500 }
        },
        bots: { ...botsConfig },
        process: { ...processConfig },
        db: {
            firebase: { ...firebaseConfig },
        },
        constants: { ...constants }
    });
}

module.exports = config();