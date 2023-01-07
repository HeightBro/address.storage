class State {
    constructor(name, db) {
        this.name = name;
        this.db = db;
        this.message = '';
    }

    init(process) {
        return new Promise((resolve, reject) => {
            process.setCurrentState(this.name);
            process.saveUserProcess()
                .then((res) => {
                    return resolve({ result: true });
                }).catch((e) => {
                    console.log(e);
                    return reject({ result: false });
                });
        });
    }

    getMessage() {
        return this.message;
    }
}

module.exports = State;