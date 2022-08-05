const { Router } = require("express");
const userControllers = require("./user.controllers");
const loginControllers = require("../login/login.controllers");

const router = Router();

router.post("/", userControllers.createOne);
router.get("/", userControllers.findMany);
//router.get("/:id", userControllers.findOne);
router.get("/:email", userControllers.findOneByEmail);
router.put(":id", userControllers.updateOne);
router.delete("/:id", userControllers.deleteOne);

router.get("/:id/paymentsfrom", userControllers.findManyPaymentsFrom);
router.get("/:id/paymentsto", userControllers.findManyPaymentsTo);

router.post("/:id", userControllers.deleteOne);

module.exports = router;
