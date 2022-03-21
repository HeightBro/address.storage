const express = require("express");
const router = express.Router({ mergeParams: true });
const path = require('path');

const appConfig = require(path.resolve(__dirname, '../../../..', 'config'));

const telegramConfig = require(path.resolve(__dirname, '../../../..', 'config/bot/messengers/telegram'));
const Telegram = require(path.resolve(__dirname, '../../../..', 'models/bot/messengers/telegram'));
const telegram = new Telegram(telegramConfig);

// Check api is available
router.get("/", (req, res) => {
    return res.status(200).send({ success: true, error: null, result: { message: "Telegram BotApi is available" } });
});

// Webhook
router.post("/webhook", (req, res) => {
    if (telegram.isTelegramMessage(req)) {
        const data = telegram.handleRequest(req);

        try {
            const url = telegram.createUrl('sendMessage');
            telegram.send('post', url, data);
        } catch (error) {
            return res.status(appConfig.errors.internal.code).send({ success: false, error: { message: appConfig.errors.internal.message }, result: null });
        }
    }

    res.end();
});

module.exports = router;