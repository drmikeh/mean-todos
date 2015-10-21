'use strict';

angular.module('todosApp')
  .service('todosService', function ($http) {

    var self = this;

    self.getAll = function() {
      return $http.get('/api/todos/');  // send request and return promise
    };

    self.add = function(todo) {
      return $http.post('/api/todos/', { todo: todo });
    };

    self.get = function(todo) {
      return $http.get('/ai/todos/' + todo._id);
    };

    self.update = function(todo) {
      return $http.put('/api/todos/' + todo._id, { todo: todo });
    };

    self.remove = function(todo) {
      return $http.delete('/api/todos/' + todo._id);
    };
  });
