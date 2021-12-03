const express = require("express");
const router = express.Router();
const axios = require('axios').default;

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
        req.body.message.from.first_name;

    if (isTelegramMessage) {
        const chatId = req.body.message.chat.id;
        const firstName = req.body.message.from.first_name;

        axios.post('https://api.telegram.org/bot2106712109:AAGz-93GqWoxUmYpNmHq5TXZschMJtd7A2c/sendMessage', {
            chat_id: chatId,
            text: `Привет, ${firstName}`,
        })
            .then(function (response) {
                console.log(JSON.stringify(response));
            })
            .catch(function (error) {
                console.log(JSON.stringify(error));
            });
    }

    res.end();
});

module.exports = router;