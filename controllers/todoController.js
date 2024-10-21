const createError = require('http-errors'); // Import createError
let todoList = [];

exports.index = function(req, res) {
  res.send(todoList);
}

exports.show = function(req, res) {
  const id = req.params.id;
  const todo = todoList.find(todo => todo.id == id);
  console.log(id,todo);
  res.send(todo);
}

exports.create = function(req, res,next) {
  const todo = req.body;

  if (!todo.title) {
    return next(createError(400, "Title is required"));
  }

  todoList.push(todo);
  res.send({"result": "success"});
}

exports.update = function(req, res,next) {
  const id = req.params.id;
  const todo = req.body;
  if(!todo.title){
    return next(createError(400, "Title is required"));
  }
  const index = todoList.findIndex(todo => todo.id == id);
  todoList[index] = todo;
  res.send({"result": "success"});
}

exports.delete = function(req, res) {
  const id = req.params.id;
  const index = todoList.findIndex(todo => todo.id == id);
  if (index === -1) {
    res.send({"result": "error does not exist"});
  }
  todoList.splice(index, 1);
  res.send({"result": "success"});
}