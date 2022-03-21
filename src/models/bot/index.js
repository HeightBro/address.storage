const axios = require('axios').default;

class Bot {
    constructor(config) {
        this.config = config;
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
        return this.config.bots_available.indexOf(name) > -1;
    };

    serviceAvailable(type) {
        return this.config.services_available.indexOf(type) > -1;
    };
}

module.exports = Bot;