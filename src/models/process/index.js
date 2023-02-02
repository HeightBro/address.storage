const path = require('path');

class Process {
    constructor(name, db, chatId) {
        this.chat_id = chatId;
        this.currentState = null;
        this.db = db;
        this.forceFinalizeOnLastStep = false;
        this.helpers = require(path.resolve(__dirname, '..', 'helpers'));
        this.name = name;
        this.state = null;
        this.userProcess = {};
        this.userResponse = '';
    }

    init() {
        return new Promise((resolve, reject) => {
            if (this.helpers.isEmptyObject(this.userProcess)) {
                this.db.getUserProcess(this.chat_id)
                    .then((res) => {
                        if (res) this.userProcess = res;

                        this.initState();

                        this.state.init(this)
                            .then((res) => {
                                if (this.isLastState() && this.forceFinalizeOnLastStep) this.finalize();

                                return resolve({ result: true, data: res });
                            }).catch((e) => {
                                console.log(e);
                                return reject(e);
                            });
                    })
                    .catch((e) => {
                        // TODO: сделать и писать в таблицу логов
                        console.log(e);
                        return reject({ result: false });
                    });
            } else {
                this.initState();

                this.state.init(this)
                    .then((res) => {
                        if (this.isLastState() && this.forceFinalizeOnLastStep) this.finalize();

                        return resolve({ result: true, data: res });
                    }).catch((e) => {
                        console.log(e);
                        return reject(e);
                    });
            }
        });
    }

    setCurrentState(name) {
        this.currentState = name;
    }

    getStateMessage() {
        return this.state.getMessage();
    }

    saveUserProcess() {
        return new Promise((resolve, reject) => {
            let data = {
                chat_id: this.chat_id,
                name: this.name,
                current_state: this.currentState,
                date_time: new Date().toString(),
            }

            if (this.helpers.isEmptyObject(this.userProcess)) {
                data.chain = JSON.stringify([]);
                this.db.saveUserProcess(data, this.chat_id);
            } else {
                if ((this.userProcess.current_state !== this.currentState)) {
                    let chain = JSON.parse(this.userProcess.chain);

                    if (this.userResponse.length) chain.push(this.userResponse);

                    data.chain = this.userProcess.chain = JSON.stringify(chain);
                    this.db.updateUserProcess(data, this.chat_id);
                }
            }

            return resolve({ result: true });
        });
    }

    handleStateUserResponse(text) {
        this.userResponse = text;

        return new Promise((resolve, reject) => {
            this.state.handleUserResponse(this)
                .then((res) => {
                    if (this.isLastState()) {
                        this.finalize();
                        return resolve({ result: true });
                    } else {
                        this.nextState()
                            .then((res) => {
                                return resolve({ result: true });
                            }).catch((e) => {
                                console.log(e);
                                return reject({ result: false });
                            });
                    }
                })
                .catch((e) => {
                    console.log(e);
                    return reject(e);
                })
        });
    }

    initState() {
        if (this.helpers.isEmptyObject(this.userProcess)) {
            this.state = new this.states[0].class(this.states[0].name, this.db, this.name)
        } else if (this.currentState === null) {
            const state = this.states[this.states.findIndex(state => state.name === this.userProcess.current_state)];
            this.state = new state.class(state.name, this.db, this.name);
        }
    }

    isLastState() {
        return typeof this.states[this.states.findIndex(state => state.name === this.state.name) + 1] === 'undefined';
    }

    nextState() {
        return new Promise((resolve, reject) => {
            this.state = this.getNextState();

            this.init()
                .then((res) => {
                    return resolve({ result: true });
                }).catch((e) => {
                    return reject({ result: false });
                });
        });
    }

    getNextState() {
        const state = this.states[this.states.findIndex(state => state.name === this.state.name) + 1];
        return new state.class(state.name, this.db, this.name);
    }

    finalize() {
        this.db.deleteUserProcess(this.chat_id);
    }

    processConfig() {
        return global.config.process;
    }
}

module.exports = Process;