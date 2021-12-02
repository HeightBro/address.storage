const express = require("express");
const router = express.Router();

// Check api is available
router.get("/", (req, res) => {
    return res.status(200).send({ status: "Api is available" });
});

// webhook
router.post("/", (req, res) => {
    /*
        You can put the logic you want here
        the message receive will be in this
        https://core.telegram.org/bots/api#update
      */
    const isTelegramMessage = req.body &&
        req.body.message &&
        req.body.message.chat &&
        req.body.message.chat.id &&
        req.body.message.from &&
        req.body.message.from.firstName;

    if (isTelegramMessage) {
        const chatId = req.body.message.chat.id;
        const firstName = req.body.message.from.first_name;

        return res.status(200).send({
            method: "sendMessage",
            chat_id: chatId,
            text: `Привет, ${firstName}`,
        });
    }

    return res.status(200).send({ status: "not a telegram message" });
});

module.exports = router;