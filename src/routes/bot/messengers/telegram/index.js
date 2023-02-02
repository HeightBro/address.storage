const express = require("express");
const router = express.Router({ mergeParams: true });
const path = require('path');

const dbModule = require(path.resolve(__dirname, '../../../..', 'models/database/firebase'));

const Telegram = require(path.resolve(__dirname, '../../../..', 'models/bot/messengers/telegram'));

let telegram;

const init = () => {
    const database = new dbModule();
    telegram = new Telegram(database);
}

// Check api is available
router.get("/", (req, res) => {
    return res.status(200).send({ success: true, error: null, result: { message: "Telegram BotApi is available" } });
});

// Webhook
router.post("/webhook", (req, res) => {
    try {
        init();
    } catch (error) {
        return res.status(global.config.errors.internal.code).send({ success: false, error: { message: global.config.errors.internal.message }, result: null });
    }

    if (telegram.isTelegramMessage(req)) {
        try {
            telegram.handleRequest(req)
                .then((data) => {
                    // TODO: ловить ошибки Телеги!
                    const url = telegram.createUrl('sendMessage');
                    telegram.send('post', url, data);
                }).catch((e) => {
                    console.log(e);
                    return res.status(global.config.errors.internal.code).send({ success: false, error: { message: global.config.errors.internal.message }, result: null });
                });
        } catch (e) {
            return res.status(global.config.errors.internal.code).send({ success: false, error: { message: global.config.errors.internal.message }, result: null });
        }
    }

    res.end();
});

module.exports = router;