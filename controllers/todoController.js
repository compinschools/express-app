const createError = require('http-errors'); // Import createError
const { Todo } = require('../models/todoModel'); // Import Todo model

exports.index = async function(req, res) {
  const todos = await Todo.find();
  return res.send(todos);
}

exports.show = async function(req, res,next) {
  const todo = await Todo.findById(req.params.id);
  if(todo)
    return res.send(todo);
  else
    return next(createError(404, "Todo not found"));
}

exports.create = function(req, res,next) {
  const todo = req.body;

  

  if (!todo.title) {
    return next(createError(400, "Title is required"));
  }

  const newTodo = new Todo(todo);
  newTodo.save();

  return res.send({result: true});

}

exports.update = async function(req, res,next) {
  const id = req.params.id;
  const todo = req.body;
  if(!todo.title){
    return next(createError(400, "Title is required"));
  }
  await Todo.findByIdAndUpdate(id, todo, {new: true});
  return res.send({result: true});
  
  
}

exports.delete = async function(req, res) {
  const id = req.params.id;

  await Todo.findByIdAndDelete(id);
  return res.send({result: true});
 
}