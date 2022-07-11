const { Router } = require("express");
const userControllers= require("./user.controllers");
const router = Router();

router.post('/', userControllers.createOne);;
router.get('/', userControllers.findMany);
router.get('/:id', userControllers.findOne);
router.put('/:id', userControllers.updateOne);
router.delete('/:id', userControllers.deleteOne);

module.exports = router;