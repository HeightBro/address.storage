const path = require('path');

const State = require(path.resolve(__dirname, '../..', 'state'));

class EnterCellTitleState extends State {
    constructor(name, db) {
        super(name, db);
    }

    init(process) {
        return new Promise((resolve, reject) => {
            this.message = 'Введите название ячейки';

            super.init(process);

            return resolve({ result: true, data: [] });
        });
    }

    handleUserResponse() {
        return new Promise((resolve, reject) => {
            this.message = 'Название ячейки сохранено';
            return resolve({ result: true });
        });
    }
}

module.exports = EnterCellTitleState;