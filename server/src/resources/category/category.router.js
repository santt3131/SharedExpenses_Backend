const { Router } = require("express");
const categoryControllers = require("./category.controllers");
const router = Router();

router.post("/", categoryControllers.createOne);
router.get("/", categoryControllers.findMany);
router.get("/:id", categoryControllers.findOne);
router.put("/:id", categoryControllers.updateOne);
router.delete("/:id", categoryControllers.deleteOne);

module.exports = router;
