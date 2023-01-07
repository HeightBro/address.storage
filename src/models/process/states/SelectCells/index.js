const path = require('path');

const State = require(path.resolve(__dirname, '../..', 'state'));

class SelectCellsState extends State {
    constructor(name, db) {
        super(name, db);
    }

    init(process) {
        return new Promise((resolve, reject) => {
            this.getCells()
                .then((res) => {
                    const data = res;

                    super.init(process)
                        .then((res) => {
                            this.createMessage(data);
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

    getCells() {
        return new Promise((resolve, reject) => {
            this.db.getCells()
                .then((res) => {
                    return resolve(res);
                }).catch(err => {
                    return reject(err);
                });
        });
    }

    createMessage(data) {
        if (data) {
            this.message = 'Введите название одной из указанных ниже ячеек:\n';

            data.forEach(v => {
                this.message += `${v.name}\n`;
            });
        } else {
            this.message = 'Не добавлено ни одной ячейки';
        }
    }

    handleUserResponse() {
        return new Promise((resolve, reject) => {
            return resolve({ result: true });
        });
    }
}

module.exports = SelectCellsState;