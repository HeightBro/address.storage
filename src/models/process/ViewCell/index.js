const path = require('path');

const Process = require(path.resolve(__dirname, '../..', 'process'));

class ViewCellProcess extends Process {
    constructor(processName, db, chatId) {
        super(processName, db, chatId);

        this.forceFinalizeOnLastStep = true;
        this.states = this.config.states[this.config.constants.commands.view_cell];
    }

    finalize() {
        super.finalize();
    }
}

module.exports = ViewCellProcess;