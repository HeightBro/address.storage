const path = require('path');

const Process = require(path.resolve(__dirname, '../..', 'process'));

class AddProductProcess extends Process {
    constructor(processName, db, chatId) {
        super(processName, db, chatId);

        this.states = this.processConfig().states[global.config.constants.commands.add_product];
    }

    finalize() {
        let chain = JSON.parse(this.userProcess.chain);
        if (this.userResponse.length) chain.push(this.userResponse);

        const [cellName, productName] = chain;

        const productData = {
            created_by: this.chat_id,
            name: productName,
            date_time: new Date().toString(),
        };

        this.db.addProduct(productData);

        const cellProductData = {
            cell: cellName,
            product: productName,
            date_time: new Date().toString(),
        };

        this.db.linkCellProduct(cellProductData, chain.join('-'));

        super.finalize();
    }
}

module.exports = AddProductProcess;