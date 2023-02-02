const express = require("express");
const router = express.Router({ mergeParams: true });
const path = require('path');

const config = require(path.resolve(__dirname, '..', 'config'));
global.config = config;

const Bot = require(path.resolve(__dirname, '..', 'models/bot'));
const bot = new Bot();

// Routers
const botRouter = require("./bot");

router.use('/bot', (req, res, next) => {
    const [serviceType, serviceName] = req.url.slice(1).split('/');

    if (!bot.serviceAvailable(serviceType)) {
        return res.status(404).send({ success: false, error: { message: `Type of service ${serviceType} is not available` }, result: null });
    }

    if (!bot.botAvailable(serviceName)) {
        return res.status(404).send({ success: false, error: { message: `Service ${serviceName} is not available` }, result: null });
    }

    next();
}, botRouter);

module.exports = router;