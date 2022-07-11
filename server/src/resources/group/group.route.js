const { Router } = require("express");
const groupControllers = require("./group.controllers");
const router = Router();

router.get('/', groupControllers.findMany);
router.get('/:id', groupControllers.findOne);
router.put('/:id', groupControllers.updateOne);
router.post('/', groupControllers.createGroupUser);

router.delete('/:idUser', groupControllers.deleteOne);

module.exports = router;