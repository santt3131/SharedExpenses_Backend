const { Router } = require("express");
const groupControllers = require("./group.controllers");
const router = Router();

router.get("/", groupControllers.findMany);
router.post("/", groupControllers.createOne);
router.get("/:id", groupControllers.findOne);
router.put("/:id", groupControllers.updateOne);
router.delete("/:id", groupControllers.deleteOne);

module.exports = router;
