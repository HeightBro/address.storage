const path = require('path');

const Bot = require(path.resolve(__dirname, '../../../..', 'models/bot'));

const constants = require(path.resolve(__dirname, '../../../..', 'config/constants'));

class Telegram extends Bot {
    constructor(config, db) {
        super(config, db);

        this.baseUrl = this.getBaseUrl();
        this.message = {};
    }

    checkMsgType() {
        if (this.message.text.indexOf('/') === 0) {
            return 'command';
        } else {
            return 'text';
        }
    };

    createAnswer(text, parseMode = '') {
        return {
            chat_id: this.message.chat.id,
            text,
            parse_mode: parseMode
        };
    };

    createHelp() {
        const commands = Array.from(this.config.commands)

        let text = '';
        commands.forEach(value => {
            // TODO: составить нормальную регулярку и вынести её в конфиг
            text += `${value.command.replace(this.config.reg_exp.send_message, '\\$&')} ${value.description}\n`;
        });

        return this.createAnswer(text, this.config.parseModes.mdV2);
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

    // Handle commands ('/*')
    handleCommand() {
        return new Promise((resolve, reject) => {
            this.command = this.message.text.slice(1);

            let message = '';

            // TODO: убрать и подумать как сделать нормальную инициализацию процесса и удалять в process.finalize()
            this.db.deleteUserProcess(this.message.chat.id)
                .then((res) => {
                    switch (this.command) {
                        case constants.commands.start:
                            return resolve(this.sayHello());

                        case constants.commands.help:
                            return resolve(this.createHelp());

                        case constants.commands.add_cell:
                        case constants.commands.add_product:
                        case constants.commands.view_cell:
                        case constants.commands.delete_product:
                            this.initProcess(this.command)
                                .then((res) => {
                                    message = this.process.getStateMessage();
                                    if (message) return resolve(this.createAnswer(message, this.config.parseModes.mdV2));
                                }).catch((e) => {
                                    message = 'error!!!';
                                    return resolve(this.createAnswer(message, this.config.parseModes.mdV2));
                                });
                            break;

                        // case constants.commands.add_product:
                        //     this.initProcess(this.command)
                        //         .then((res) => {
                        //             message = this.process.getStateMessage();
                        //             if (message) return resolve(this.createAnswer(message, this.config.parseModes.mdV2));
                        //         }).catch((e) => {
                        //             message = 'error!!!';
                        //             return resolve(this.createAnswer(message, this.config.parseModes.mdV2));
                        //         });
                        //     break;

                        // case constants.commands.view_cell:
                        //     this.db.saveStep(ref, stepData);
                        //     return this.createStubAnswer(this.config.stub_messages.in_development);

                        // case constants.commands.delete_product:
                        //     this.initProcess(this.command)
                        //         .then((res) => {
                        //             message = this.process.getStateMessage();
                        //             if (message) return resolve(this.createAnswer(message, this.config.parseModes.mdV2));
                        //         }).catch((e) => {
                        //             message = 'error!!!';
                        //             return resolve(this.createAnswer(message, this.config.parseModes.mdV2));
                        //         });
                        //     break;

                        case constants.commands.delete_cell:
                            return resolve(this.createStubAnswer(this.config.stub_messages.in_development));

                        default:
                            return resolve(this.createStubAnswer(this.config.stub_messages.in_development));
                    }
                }).catch((e) => {
                    console.log(e);
                });
        });
    };

    handleText() {
        return new Promise((resolve, reject) => {
            const helloMessage = this.checkHelloMsg(this.message.text.toLowerCase().trim());

            if (!helloMessage) {
                this.db.getUserProcess(this.message.chat.id)
                    .then((res) => {
                        if (res !== false) {
                            this.initProcess(res.name)
                                .then((res) => {
                                    this.process.handleStateUserResponse(this.message.text)
                                        .then((res) => {
                                            return resolve(this.createAnswer(this.process.getStateMessage(), this.config.parseModes.mdV2));
                                        }).catch((e) => {
                                            console.log(e);
                                            let message = 'error!!!';
                                            return resolve(this.createAnswer(message, this.config.parseModes.mdV2));
                                        });
                                }).catch((e) => {
                                    console.log(e);
                                    let message = 'error!!!';
                                    return resolve(this.createAnswer(message, this.config.parseModes.mdV2));
                                });
                        }
                    })
                    .catch((e) => {
                        // TODO: сделать и писать в таблицу логов
                        console.log(e);
                        return reject(e);
                    });
            } else {
                return resolve(helloMessage);
            }
        });
    };

    handleRequest(req) {
        this.message = req.body.message;

        return new Promise((resolve, reject) => {
            this.db.getUser(this.message.chat.id)
                .then((res) => {
                    const user = {
                        chat_id: this.message.chat.id,
                        first_name: this.message.chat.first_name,
                        last_name: this.message.chat.last_name,
                        patronymic: "",
                        username: this.message.chat.username,
                        is_bot: this.message.from.is_bot,
                        language_code: this.message.from.language_code,
                        date_time: new Date().toString(),
                    };

                    if (res === false) {
                        this.db.saveUser(user);
                    } else {
                        this.db.updateUser(user, res.is_admin);
                    }
                })
                .catch((e) => {
                    // TODO: сделать и писать в таблицу логов
                    console.log(e);
                });

            try {
                const msgType = this.checkMsgType();
                const method = 'handle' + this.helpers.capitalizeFirstLetter(msgType);

                this[method]()
                    .then((res) => {
                        return resolve(res);
                    })
                    .catch((e) => {
                        // TODO: сделать и писать в таблицу логов
                        console.log(e);
                    });
            } catch (e) {
                return reject(e);
            }
        });
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

    checkHelloMsg(text) {
        let result = false;

        switch (text) {
            case 'hello':
            case 'привет':
            case 'здорова':
            case 'здарова':
                result = this.sayHello();

            default:
                break;
        }

        return result;
    }

    sayHello() {
        const text = this.command === 'start'
            ? this.helpers.sprintf('Привет, %s!\nХочешь ознакомиться с командами бота?\nОтправь %s', this.message.from.first_name, '/help')
            : this.helpers.sprintf('Привет, %s!', this.message.from.first_name);
        return this.createAnswer(text);
    };

    send(method, url, data) {
        super.send(method, url, data);
    };
}

module.exports = Telegram;