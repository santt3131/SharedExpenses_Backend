const { Router } = require("express");
const GroupControllers = require("./Group.controllers");
const router = Router();

router.post('/', GroupControllers.createOne);
router.get('/', GroupControllers.findMany);
router.get('/:id', GroupControllers.findOne);
//router.put('/:id', GroupControllers.updateOne);
//Primera transaccion
router.put('/creategroup', GroupControllers.createGroupUser);

router.delete('/:id', GroupControllers.deleteOne);

module.exports = router;