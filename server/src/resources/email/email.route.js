const { Router } = require("express");
const emailControllers = require("./email.controllers");
const router = Router();

router.post("/invitation", emailControllers.sendInvitation);
router.post("/reinvitation", emailControllers.resendInvitation);
router.post("/resetpassword", emailControllers.resetPassword);

module.exports = router;
