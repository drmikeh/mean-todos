'use strict';

var _ = require('lodash');
var Todo = require('./todo.model');
var User = require('../user/user.model');

function findTodoById(user, id) {
  return _.find(user.todos, function(todo) {
    return todo._id.equals(id);
  });
}

// Get list of todos
exports.index = function(req, res) {
  // req.user will be populated by the isAuthenticated function
  var userId = req.user._id;
  User.findById(userId, function(err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.status(404).send('Not Found'); }
    return res.status(200).json(user.todos);
  });
};

// Get a single todo
exports.show = function(req, res) {
  // req.user will be populated by the isAuthenticated function
  var userId = req.user._id;
  User.findById(userId, function(err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.status(404).send('Not Found'); }
    var todo = findTodoById(user, req.params.id);
    if (todo) return res.json(todo);
    else return res.status(404).send('Not Found');
  });
};

// Creates a new todo in the DB.
exports.create = function(req, res) {
  // req.user will be populated by the isAuthenticated function
  var userId = req.user._id;
  User.findById(userId, function(err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.status(404).send('Not Found'); }
    user.todos.push(new Todo(req.body.todo));
    user.save(function() {
      return res.json(201, user.todos);
    });
  });
};

// Updates an existing todo in the DB.
exports.update = function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.send(404); }
    var todo = findTodoById(user, req.params.id);
    _.merge(todo, req.body.todo);
    console.log('about to save: ', todo);
    user.save(function (err, saved) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(todo);
    });
  });
};

// Deletes a todo from the DB.
exports.destroy = function(req, res) {
  // req.user will be populated by the isAuthenticated function
  var userId = req.user._id;
  User.findById(userId, function(err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.status(404).send('Not Found'); }
    var todo = findTodoById(user, req.params.id);
    user.todos.pull(todo._id); // pull is a feature of MongooseArray!
    user.save(function() {
      return res.json(200, user.todos);
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
