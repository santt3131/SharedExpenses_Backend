const { Router } = require("express");
const emailControllers = require("./email.controllers");
const router = Router();

router.post("/invitation", emailControllers.sendInvitation);

module.exports = router;
