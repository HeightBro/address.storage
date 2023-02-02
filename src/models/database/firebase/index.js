// const path = require('path');

const { initializeApp, cert, getApps, getApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

class FirebaseDB {
    constructor() {
        this.app = !getApps().length ? initializeApp({ credential: cert(this.dbConfig().service_account) }) : getApp()
        this.firestore = getFirestore();
    }

    create(ref, data) {
        ref.set(data);
    }

    read(ref, where = false, limit = false) {
        return new Promise((resolve, reject) => {
            let query = ref;

            if (where) query = ref.where(where.cols, where.cond, where.val);

            if (limit !== false) query = query.limit(limit);

            query.get()
                .then((res) => {
                    return resolve(res);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }

    update(ref, data) {
        ref.update(data);
    }

    update(ref, data) {
        ref.update(data);
    }

    delete(ref) {
        return new Promise((resolve, reject) => {
            ref.delete()
                .then((res) => {
                    return resolve(res);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }

    // TODO: Переделать, чтобы collection_path брался из конфига сервиса
    getRef(entity, doc = false, collectionPath = this.dbConfig().firebase.collection_path) {
        let path = entity;

        if (collectionPath) path = `${path}/${collectionPath}`;

        let ref = this.firestore.collection(path);

        if (doc !== false) {
            ref = ref.doc(doc.toString());
        }

        return ref;
    }

    getUser(chatId) {
        const ref = this.getRef(this.dbConfig().firebase.entities.users);

        return new Promise((resolve, reject) => {
            const where = {
                cols: 'chat_id',
                cond: '==',
                val: chatId
            };

            this.read(ref, where, 1)
                .then((res) => {
                    if (res.empty) {
                        return resolve(false);
                    }

                    res.forEach(doc => {
                        return resolve(doc.data());
                    });
                }).catch(err => {
                    return reject(err);
                });
        });
    }

    saveUser(data, isAdmin = false) {
        const ref = this.getRef(this.dbConfig().firebase.entities.users, data.chat_id);
        data.is_admin = isAdmin;

        this.create(ref, data);
    }

    updateUser(data, isAdmin = false) {
        const ref = this.getRef(this.dbConfig().firebase.entities.users, data.chat_id);
        data.is_admin = isAdmin;

        this.update(ref, data);
    }

    getUserProcess(chatId) {
        const ref = this.getRef(this.dbConfig().firebase.entities.user_processes);

        return new Promise((resolve, reject) => {
            const where = {
                cols: 'chat_id',
                cond: '==',
                val: chatId
            };

            this.read(ref, where, 1)
                .then((res) => {
                    if (res.empty) {
                        return resolve(false);
                    }

                    res.forEach(doc => {
                        return resolve(doc.data());
                    });
                }).catch(err => {
                    return reject(err);
                });
        });
    }

    saveUserProcess(data) {
        const ref = this.getRef(this.dbConfig().firebase.entities.user_processes, data.chat_id);
        this.create(ref, data);
    }

    updateUserProcess(data) {
        const ref = this.getRef(this.dbConfig().firebase.entities.user_processes, data.chat_id);
        this.update(ref, data);
    }

    deleteUserProcess(chatId) {
        return new Promise((resolve, reject) => {
            const ref = this.getRef(this.dbConfig().firebase.entities.user_processes, chatId);

            this.delete(ref)
                .then((res) => {
                    return resolve(res);
                })
                .catch(e => {
                    return reject(e);
                });
        });
    }

    addCell(data) {
        const ref = this.getRef(this.dbConfig().firebase.entities.cells, data.name, false);
        this.create(ref, data);
    }

    getCells() {
        const ref = this.getRef(this.dbConfig().firebase.entities.cells, false, false);

        return new Promise((resolve, reject) => {
            this.read(ref)
                .then((res) => {
                    if (res.empty) {
                        return resolve(false);
                    }

                    return resolve(res.docs.map(doc => doc.data()));
                }).catch(err => {
                    return reject(err);
                });
        });
    }

    getCellProducts(cell) {
        const ref = this.getRef(this.dbConfig().firebase.entities.cells_products, false, false);

        return new Promise((resolve, reject) => {
            const where = {
                cols: 'cell',
                cond: '==',
                val: cell
            };

            this.read(ref, where)
                .then((res) => {
                    if (res.empty) {
                        return resolve(false);
                    }

                    const cellProducts = res.docs.map(doc => doc.data().product);

                    this.getProducts(cellProducts)
                        .then((res) => {
                            if (!res) {
                                return resolve(false);
                            }

                            return resolve(res);
                        }).catch(err => {
                            return reject(err);
                        });
                }).catch(err => {
                    return reject(err);
                });
        });
    }

    linkCellProduct(data, doc) {
        const ref = this.getRef(this.dbConfig().firebase.entities.cells_products, doc, false);
        this.create(ref, data);
    }

    unlinkCellProduct(doc) {
        return new Promise((resolve, reject) => {
            const ref = this.getRef(this.dbConfig().firebase.entities.cells_products, doc, false);

            this.delete(ref);
            // .then((res) => {
            //     return resolve(res);
            // })
            // .catch(e => {
            //     return reject(e);
            // });
        });
    }

    addProduct(data) {
        const ref = this.getRef(this.dbConfig().firebase.entities.products, data.name, false);
        this.create(ref, data);
    }

    getProducts(productNames) {
        const ref = this.getRef(this.dbConfig().firebase.entities.products, false, false);

        return new Promise((resolve, reject) => {
            const where = {
                cols: 'name',
                cond: 'in',
                val: productNames
            };

            this.read(ref, where)
                .then((res) => {
                    if (res.empty) {
                        return resolve(false);
                    }

                    return resolve(res.docs.map(doc => doc.data()));
                }).catch(err => {
                    return reject(err);
                });
        });
    }

    deleteProduct(doc) {
        const ref = this.getRef(this.dbConfig().firebase.entities.products, doc, false);

        this.delete(ref);
        // .then((res) => {
        //     return resolve(res);
        // })
        // .catch(e => {
        //     return reject(e);
        // });
    }

    dbConfig() {
        return global.config.db.firebase;
    }
}

module.exports = FirebaseDB;