const path = require('path');

const Process = require(path.resolve(__dirname, '../..', 'process'));

class AddCellProcess extends Process {
    constructor(processName, db, chatId) {
        super(processName, db, chatId);

        this.states = this.config.states[this.config.constants.commands.add_cell];

        this.state = new this.states[0].class(this.states[0].name, this.db);
    }

    finalize() {
        const data = {
            created_by: this.chat_id,
            name: this.userResponse,
            date_time: new Date().toString(),
        };

        this.db.addCell(data);

        super.finalize();
    }
}

module.exports = AddCellProcess;