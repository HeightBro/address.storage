const path = require('path');

const State = require(path.resolve(__dirname, '../..', 'state'));

class EnterProuctTitleState extends State {
    constructor(name, db) {
        super(name, db);
    }

    init(process) {
        return new Promise((resolve, reject) => {
            this.message = 'Введите название товара';

            super.init(process)
                .then((res) => {
                    return resolve({ result: true, data: [] });
                }).catch((e) => {
                    console.log(e);
                    return reject({ result: false, data: [] });
                });
        });
    }

    handleUserResponse() {
        return new Promise((resolve, reject) => {
            this.getFinalizeMessage();
            return resolve({ result: true });
        });
    }

    // TODO: вынести в базовый класс и там брать сообщения в зависимости от контекста (процесса); убрать все сообщения в конфиг стейтов
    getFinalizeMessage() {
        this.message = 'Товар добавлен в ячейку';
    }
}

module.exports = EnterProuctTitleState;