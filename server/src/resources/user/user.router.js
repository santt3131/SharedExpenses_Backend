const { Router } = require("express");
const userControllers = require("./user.controllers");
const router = Router();

router.get("/", userControllers.findMany);
router.post("/", userControllers.createOne);
router.get("/:id", userControllers.findOne);
router.put("/:id", userControllers.updateOne);
router.delete("/:id", userControllers.deleteOne);

module.exports = router;
