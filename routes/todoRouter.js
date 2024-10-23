const express = require('express');
const router = express.Router();
const todos = require('../controllers/todoController');

router.get('/', todos.index);
router.get('/:id', todos.show);
router.post('/', todos.create);
router.put('/:id', todos.update);
router.delete('/:id', todos.delete);

module.exports = router;