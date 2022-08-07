const { Router } = require("express");
const emailControllers = require("./email.controllers");
const router = Router();

router.post("/invitation", emailControllers.sendInvitation);
router.post("/reinvitation", emailControllers.resendInvitation);

module.exports = router;
