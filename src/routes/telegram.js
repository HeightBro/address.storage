const express = require("express");
const router = express.Router();
const axios = require('axios').default;

// Check api is available
router.get("/", (req, res) => {
    return res.status(200).send({ status: "Api is available" });
});

// webhook
router.post("/", (req, res) => {

    const randomInteger = function (min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
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

        const msg = req.body.message.text.toLowerCase();

        let data;

        if (msg == "сука" || msg == "пидор" || msg == "пидар" || msg == "гандон" || msg == "пидарас") {
            const rand = randomInteger(1, 10);
            const text = rand >= 5 ? "Кто как обзывается, тот так и называется!:)" : `Привет, ${msg}`;

            data = {
                chat_id: chatId,
                text,
            };
        } else {
            data = {
                chat_id: chatId,
                text: `Привет, ${firstName}`,
            };
        }

        axios.post('https://api.telegram.org/bot2106712109:AAGz-93GqWoxUmYpNmHq5TXZschMJtd7A2c/sendMessage', data)
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