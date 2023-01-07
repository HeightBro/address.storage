const path = require('path');

const Process = require(path.resolve(__dirname, '../..', 'process'));

class DeleteProductProcess extends Process {
    constructor(processName, db, chatId) {
        super(processName, db, chatId);

        this.states = this.config.states[this.config.constants.commands.delete_product];
    }

    finalize() {
        let chain = JSON.parse(this.userProcess.chain);
        if (this.userResponse.length) chain.push(this.userResponse);

        const productName = chain[1];

        // this.db.deleteProduct(productName);
        this.db.unlinkCellProduct(chain.join('-'));

        super.finalize();
    }
}

module.exports = DeleteProductProcess;