const path = require('path');

const telegramConfig = require(path.resolve(__dirname, 'messengers/telegram'));

const bot = () => {
    return {
        services_available: ['messengers'],
        bots_available: ['telegram'],
        services: {
            messengers: {
                telegram: { ...telegramConfig },
            },
        }
    }
}

module.exports = bot();