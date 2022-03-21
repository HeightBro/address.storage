const express   = require("express");
const router    = express.Router();

// Routers
const telegramRouter = require("./telegram");

router.use('/telegram', telegramRouter);

module.exports = router;