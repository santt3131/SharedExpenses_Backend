const { Router } = require("express");
const loginControllers = require("./login.controllers");
const router = Router();


router.post("/", loginControllers.login);


module.exports = router;
