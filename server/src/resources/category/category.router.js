const { Router } = require("express");
const categoryControllers = require("./category.controllers");
const router = Router();

router.get("/", categoryControllers.findMany);
router.post("/", categoryControllers.createOne);
router.get("/:id", categoryControllers.findOne);
router.put("/:id", categoryControllers.updateOne);
router.delete("/:id", categoryControllers.deleteOne);

module.exports = router;
