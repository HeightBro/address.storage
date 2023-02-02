const express = require("express");
const router = express.Router({ mergeParams: true });
const path = require('path');

const Telegram = require(path.resolve(__dirname, '../../../..', 'models/bot/messengers/telegram'));
const telegram = new Telegram();

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
            return res.status(global.config.errors.internal.code).send({ success: false, error: { message: global.config.errors.internal.message }, result: null });
        }
    }

    res.end();
});

module.exports = router;