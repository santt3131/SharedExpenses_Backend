const { Router } = require("express");
const expenseControllers = require("./expense.controllers");
const router = Router();

router.get("/", expenseControllers.findMany);
router.post("/", expenseControllers.createOne);
router.get("/:id", expenseControllers.findOne);
router.put("/:id", expenseControllers.updateOne);
router.delete("/:id", expenseControllers.deleteOne);

module.exports = router;
