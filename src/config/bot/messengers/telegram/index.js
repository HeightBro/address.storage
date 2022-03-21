const telegram = () => {
    return {
        token: "2106712109:AAGz-93GqWoxUmYpNmHq5TXZschMJtd7A2c",
        base_url: "https://api.telegram.org/bot",
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
        templates: {
            help: [
                {
                    command: '/help',
                    description: 'Показать список команд'
                },
                {
                    command: '/add_cell',
                    description: 'Добавить новую ячейку'
                },
                {
                    command: '/add_product',
                    description: 'Добавить новый товар в ячейку'
                },
                {
                    command: '/view_cell',
                    description: 'Просмотр товаров в ячейке'
                },
                {
                    command: '/delete_product',
                    description: 'Удалить товар из ячейки'
                },
                {
                    command: '/delete_cell',
                    description: 'Удалить ячейку'
                }
            ],
        },
    }
}

module.exports = telegram();