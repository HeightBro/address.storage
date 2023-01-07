const path = require('path');

const constants = require(path.resolve(__dirname, '../../../..', 'config/constants'));

const telegram = () => {
    return {
        token: "2106712109:AAGz-93GqWoxUmYpNmHq5TXZschMJtd7A2c",
        base_url: "https://api.telegram.org/bot",
        command_time_limit: 900000, // миллисекунды
        methods_available: ['sendMessage'],
        parseModes: {
            html: 'HTML',
            mdV2: 'MarkdownV2'
        },
        reg_exp: {
            send_message: /\_/
        },
        stub_messages: {
            in_development: 'Функционал находится в разработке'
        },
        commands: [
            {
                name_en: 'Help',
                command: '/' + constants.commands.help,
                description: 'Показать список команд'
            },
            {
                name_en: 'Add cell',
                command: '/' + constants.commands.add_cell,
                description: 'Добавить новую ячейку',
            },
            {
                name_en: 'Add product',
                command: '/' + constants.commands.add_product,
                description: 'Добавить новый товар в ячейку'
            },
            {
                name_en: 'View cell',
                command: '/' + constants.commands.view_cell,
                description: 'Просмотр товаров в ячейке'
            },
            {
                name_en: 'Delete product',
                command: '/' + constants.commands.delete_product,
                description: 'Удалить товар из ячейки'
            },
            {
                name_en: 'Delete cell',
                command: '/' + constants.commands.delete_product,
                description: 'Удалить ячейку'
            }
        ],
    }
}

module.exports = telegram();