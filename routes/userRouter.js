const express = require('express');
const router = express.Router();
const users = require('../controllers/userController');

router.get('/', users.index);
router.get('/:username', users.show);
router.post('/', users.create);
router.delete('/:username', users.delete);

module.exports = router;