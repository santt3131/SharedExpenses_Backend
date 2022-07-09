const { Router } = require("express");
const CategoryControllers = require("./category.controllers");
const router = Router();

router.post("/", CategoryControllers.createOne);
router.get("/", CategoryControllers.findMany);
router.get("/:id", CategoryControllers.findOne);
router.put("/:id", CategoryControllers.updateOne);
router.delete("/:id", CategoryControllers.deleteOne);

module.exports = router;
