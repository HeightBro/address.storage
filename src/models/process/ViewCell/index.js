const path = require('path');

const Process = require(path.resolve(__dirname, '../..', 'process'));

class ViewCellProcess extends Process {
    constructor(processName, db, chatId) {
        super(processName, db, chatId);

        this.forceFinalizeOnLastStep = true;
        this.states = this.processConfig().states[global.config.constants.commands.view_cell];
    }

    finalize() {
        super.finalize();
    }
}

module.exports = ViewCellProcess;