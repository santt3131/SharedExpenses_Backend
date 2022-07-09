const { Router } = require("express");
const ExpenseControllers = require("./expense.controllers");
const router = Router();

router.post("/", ExpenseControllers.createOne);
router.get("/", ExpenseControllers.findMany);
router.get("/:id", ExpenseControllers.findOne);
router.put("/:id", ExpenseControllers.updateOne);
router.delete("/:id", ExpenseControllers.deleteOne);

module.exports = router;
