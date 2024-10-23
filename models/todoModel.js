const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  completed: Boolean
});

module.exports.Todo = mongoose.model('Todo', todoSchema, 'todos');