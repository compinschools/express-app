const express = require('express');
const router = express.Router();
const users = require('../controllers/userController');

router.get('/', users.index);
router.get('/:username', users.show);
router.post('/login', users.login);
router.post('/', users.create);

module.exports = router;