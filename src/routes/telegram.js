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

        return res.status(200).json({
            method: "sendMessage",
            chatId,
            text: `Привет, ${firstName}`,
        });

        // return res.status(200).json();
    }

    res.end(); //end the response
    // return res.status(200).json({ status: "not a telegram message" });
});

module.exports = router;