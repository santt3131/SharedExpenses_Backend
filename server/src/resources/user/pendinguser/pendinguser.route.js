const { Router } = require("express");
const pendinguserControllers = require("./pendinguser.controllers");


const router = Router();

router.post("/register",pendinguserControllers.registerEmail);
router.post("/confirm",pendinguserControllers.newuserConfirmation);


module.exports = router;
