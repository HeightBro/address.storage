const path = require('path');

const State = require(path.resolve(__dirname, '../..', 'state'));

class SelectCellProductsState extends State {
    constructor(name, db) {
        super(name, db);
    }

    init(process) {
        return new Promise((resolve, reject) => {
            this.getCellProducts(process.userResponse)
                .then((res) => {
                    const data = res;

                    super.init(process)
                        .then((res) => {
                            this.createMessage(data, process);
                            return resolve({ result: true, data: [] });
                        }).catch((e) => {
                            console.log(e);
                            return reject({ result: false, data: [] });
                        });
                }).catch((e) => {
                    console.log(e);
                    return reject(e);
                });
        });
    }

    getCellProducts(cell) {
        return new Promise((resolve, reject) => {
            this.db.getCellProducts(cell)
                .then((res) => {
                    return resolve(res);
                }).catch(err => {
                    return reject(err);
                });
        });
    }

    createMessage(data, process) {
        if (data) {
            // TODO: вынести в базовый класс и там брать сообщения в зависимости от контекста (процесса); убрать все сообщения в конфиг стейтов и отказаться от проброса process
            if (process.name !== global.config.constants.commands.view_cell) this.message = 'Введите название одного из указанных ниже продуктов:\n';

            data.forEach(v => {
                this.message += `${v.name}\n`;
            });
        } else {
            this.message = 'Не добавлено ни одного продукта в ячейку';
        }
    }

    handleUserResponse() {
        return new Promise((resolve, reject) => {
            this.getFinalizeMessage();
            return resolve({ result: true });
        });
    }

    // TODO: вынести в базовый класс и там брать сообщения в зависимости от контекста (процесса); убрать все сообщения в конфиг стейтов
    getFinalizeMessage() {
        this.message = 'Товар удален из ячейки';
    }
}

module.exports = SelectCellProductsState;