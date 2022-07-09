const { Router } = require("express");
const GroupControllers = require("./Group.controllers");
const router = Router();

router.post('/', GroupControllers.createOne);
router.get('/', GroupControllers.findMany);
router.get('/:id', GroupControllers.findOne);
//router.put('/:id', GroupControllers.updateOne);
router.put('/creategroup', GroupControllers.createGroupUser);

router.delete('/:idUser', GroupControllers.deleteOne);

module.exports = router;