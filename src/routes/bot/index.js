const express   = require("express");
const router    = express.Router();

// Routers
const messengersRouter = require("./messengers");

router.use('/messengers', messengersRouter);

module.exports = router;