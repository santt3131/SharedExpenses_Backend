const { Router } = require("express");
const UserControllers= require("./User.controllers");
const router = Router();

router.post('/', UserControllers.createOne);;
router.get('/', UserControllers.findMany);
router.get('/:id', UserControllers.findOne);
router.put('/:id', UserControllers.updateOne);
router.delete('/:id', UserControllers.deleteOne);

module.exports = router;