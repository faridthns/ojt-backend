const express = require('express');
const router = express.Router();
const siswaControllers = require('../controllers/siswaControllers');
// const auth = require('../middlewares/auth');

const { validateSiswaCreate, validateSiswaUpdate } = require('../middlewares/siswaMiddlewares');

router.get('/', siswaControllers.getAll);
router.get('/:id', siswaControllers.getById);
router.post('/', validateSiswaCreate, siswaControllers.create);
router.put('/:id', validateSiswaUpdate, siswaControllers.update);
router.delete('/:id', siswaControllers.remove);

module.exports = router;