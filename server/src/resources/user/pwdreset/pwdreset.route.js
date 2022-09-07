const { Router } = require("express");
const pwdResetControllers = require("./pwdreset.controllers");


const router = Router();

router.post("/update",pwdResetControllers.updatepassword);
router.post("/request",pwdResetControllers.resetPasswordEmail);

module.exports = router;
