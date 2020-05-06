var tasks = require('../database/tasks'),
  getNextId = require('./getNextId');

var nextId = getNextId(tasks);

exports.getTasks = function(req, res) {
  res.send(tasks);
}

exports.getTasksByUser = function(req, res) {
  res.send(tasks.filter(task => task.id_assigned === parseInt(req.params.id)))
}

exports.createTask = function(req, res) {
  var newTask = req.body;
  newTask.id = nextId;
  newTask.status = "new";
  nextId++;
  tasks.push(newTask);

  res.send(newTask);
  res.end(); 
}


