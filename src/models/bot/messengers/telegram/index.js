const path = require('path');

const Bot = require(path.resolve(__dirname, '../../../..', 'models/bot'));
const { sprintf, capitalizeFirstLetter } = require(path.resolve(__dirname, '../../../..', 'models/helpers'));

class Telegram extends Bot {
    constructor(config) {
        super();
        this.config = config;
        this.baseUrl = this.getBaseUrl();
        this.message = {};
    }

    checkMsgType() {
        if (this.message.text.indexOf('/') === 0) {
            return 'command';
        } else {
            return 'text';
        }
    }

    createAnswer(text, parseMode = '') {
        return {
            chat_id: this.message.chat.id,
            text,
            parse_mode: parseMode
        };
    };

    createStubAnswer(text, parseMode = '') {
        return {
            chat_id: this.message.chat.id,
            text,
            parse_mode: parseMode
        };
    };

    createUrl(method) {
        if (!this.methodAvailable(method)) {
            throw new Error('Method not available');
        }

        return `${this.baseUrl}/${method}`;
    };

    getBaseUrl() {
        return `${this.config.base_url}${this.config.token}`;
    };

    handleCommand() {
        this.command = this.message.text.slice(1);

        switch (this.command) {
            case 'start':
                return this.sayHello();
            case 'help':
                return this.createHelp();
            case 'add_cell':
                return this.createStubAnswer(this.config.stub_messages.in_development);
            case 'add_product':
                return this.createStubAnswer(this.config.stub_messages.in_development);
            case 'view_cell':
                return this.createStubAnswer(this.config.stub_messages.in_development);
            case 'delete_product':
                return this.createStubAnswer(this.config.stub_messages.in_development);
            case 'delete_cell':
                return this.createStubAnswer(this.config.stub_messages.in_development);

            default:
                break;
        }
    };

    handleText() {
        switch (this.message.text.toLowerCase().trim()) {
            case 'hello':
            case '????????????':
            case '??????????????':
            case '??????????????':
                return this.sayHello();

            default:
                break;
        }
    };

    handleRequest(req) {
        this.message = req.body.message;

        const msgType = this.checkMsgType();
        const method = 'handle' + capitalizeFirstLetter(msgType);
        const data = this[method]();

        return data;
    };

    createHelp() {
        let templates = {};
        Object.assign(templates, this.config.templates.help);

        let text = '';
        for (const key in templates) {
            if (Object.hasOwnProperty.call(templates, key)) {
                // TODO: ?????????????????? ?????????????????? ?? ?????????????? ???? ?? ????????????
                text += `${templates[key].command.replace(this.config.reg_exp.send_message, '\\$&')} ${templates[key].description}\n`;
            }
        }

        return this.createAnswer(text, this.config.parseModes.mdV2);
    };

    isTelegramMessage(data) {
        if (data.body
            && data.body.message
            && data.body.message.chat
            && data.body.message.chat.id
            && data.body.message.from
            && data.body.message.from.first_name) {
            return true;
        }

        return false;
    };

    methodAvailable(method) {
        return this.config.methods_available.indexOf(method) > -1;
    };

    sayHello() {
        const text = this.command === 'start'
            ? sprintf('????????????, %s!\n???????????? ???????????????????????? ?? ?????????????????????????\n?????????????? %s', this.message.from.first_name, '/help')
            : sprintf('????????????, %s!', this.message.from.first_name);
        return this.createAnswer(text);
    };

    send(method, url, data) {
        super.send(method, url, data);
    };
}

module.exports = Telegram;