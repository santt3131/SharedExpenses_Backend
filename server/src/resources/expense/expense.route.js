const { Router } = require("express");
const expenseControllers = require("./expense.controllers");
const router = Router();

router.get("/", expenseControllers.findMany);
router.post("/", expenseControllers.createOne);
router.get("/:id", expenseControllers.findOne);
router.put("/:id", expenseControllers.updateOne);//Update global expenses
router.put("/:id/payments/", expenseControllers.addPayments);//solo pagos
router.delete("/:id/payments/", expenseControllers.deletePayments);
router.delete("/:id", expenseControllers.deleteOne);

module.exports = router;
