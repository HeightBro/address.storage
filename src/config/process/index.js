const path = require('path');

const constants = require(path.resolve(__dirname, '..', 'constants'));

// Processes
const AddCellProcess = require(path.resolve(__dirname, '../..', 'models/process/AddCell'));
const AddProductProcess = require(path.resolve(__dirname, '../..', 'models/process/AddProduct'));
const DeleteProductProcess = require(path.resolve(__dirname, '../..', 'models/process/DeleteProduct'));
const ViewCellProcess = require(path.resolve(__dirname, '../..', 'models/process/ViewCell'));

// States
const EnterCellTitleState = require(path.resolve(__dirname, '../..', 'models/process/states/EnterCellTitle'));
const EnterProuctTitleState = require(path.resolve(__dirname, '../..', 'models/process/states/EnterProductTitle'));
const SelectCellsState = require(path.resolve(__dirname, '../..', 'models/process/states/SelectCells'));
const SelectCellProductsState = require(path.resolve(__dirname, '../..', 'models/process/states/SelectCellProducts'));

const process = () => {
    return {
        list: {
            [constants.commands.add_cell]: AddCellProcess,
            // [constants.commands.delete_cell]: DeleteCell,
            [constants.commands.add_product]: AddProductProcess,
            [constants.commands.delete_product]: DeleteProductProcess,
            [constants.commands.view_cell]: ViewCellProcess,
        },
        states: {
            [constants.commands.add_cell]: [
                {
                    name: 'enter_cell_title',
                    class: EnterCellTitleState,
                }
            ],
            [constants.commands.view_cell]: [
                {
                    name: 'select_cells',
                    class: SelectCellsState,
                },
                {
                    name: 'select_cell_products',
                    class: SelectCellProductsState,
                },
            ],
            // [constants.commands.delete_cell]: DeleteCell,
            [constants.commands.add_product]: [
                {
                    name: 'select_cells',
                    class: SelectCellsState,
                },
                {
                    name: 'enter_product_title',
                    class: EnterProuctTitleState,
                },
            ],
            [constants.commands.delete_product]: [
                {
                    name: 'select_cells',
                    class: SelectCellsState,
                },
                {
                    name: 'select_cell_products',
                    class: SelectCellProductsState,
                },
            ],
        }
    }
}

module.exports = process();