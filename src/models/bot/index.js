const axios = require('axios').default;

class Bot {
    constructor() {
    }

    send(method, url, data) {
        axios({ method, url, data })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                console.error(JSON.stringify(error.response.data));
                throw new Error(error);
            });
    };

    botAvailable(name) {
        return global.config.bots.bots_available.indexOf(name) > -1;
    };

    serviceAvailable(type) {
        return global.config.bots.services_available.indexOf(type) > -1;
    };

    botConfig(service, type) {
        return global.config.bots.services[service][type];
    }
}

module.exports = Bot;