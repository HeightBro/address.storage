const axios = require('axios').default;
const path = require('path');

const processConfig = require(path.resolve(__dirname, '../..', 'config/process'));

class Bot {
    constructor(db) {
        this.db = db;
        this.process = null;
        this.helpers = require(path.resolve(__dirname, '..', 'helpers'));
    }

    send(method, url, data) {
        axios({ method, url, data })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                // TODO: писать логи в БД
                return error.response.data;
            });
    };

    botAvailable(name) {
        return global.config.bots.bots_available.indexOf(name) > -1;
    };

    serviceAvailable(type) {
        return global.config.bots.services_available.indexOf(type) > -1;
    };

    initProcess(command) {
        return new Promise((resolve, reject) => {
            const process = new processConfig.list[command](command, this.db, this.message.chat.id);

            process.init()
                .then((res) => {
                    this.setProcess(process);

                    return resolve({ result: true, data: [] });
                }).catch((e) => {
                    console.log(e);
                    return reject(e);
                });
        });
    };

    setProcess(process) {
        this.process = process;
    };

    botConfig(service, type) {
        return global.config.bots.services[service][type];
    }
}

module.exports = Bot;