const { Router } = require("express");
const GroupControllers = require("./Group.controllers");
const router = Router();

router.get('/', GroupControllers.findMany);
router.get('/:id', GroupControllers.findOne);
router.put('/:id', GroupControllers.updateOne);
router.post('/', GroupControllers.createGroupUser);

router.delete('/:idUser', GroupControllers.deleteOne);

module.exports = router;