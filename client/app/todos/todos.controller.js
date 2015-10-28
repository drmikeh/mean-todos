'use strict';

angular.module('todosApp')
  .controller('TodosCtrl', function ($scope, todosService) {

    $scope.todos = [];

    $scope.getAll = function() {
      todosService.getAll().then(function(response) {
        $scope.todos = response.data;
      });
    };

    $scope.getAll();  // when this controller starts up, get the data

    $scope.add = function() {
      var todo = { name: $scope.newTodoName, completed: false };
      todosService.add(todo).then(function() {
        $scope.newTodoName = '';
        $scope.getAll();
      });
    };

    $scope.update = function(todo) {
      console.log('updating todo:', JSON.stringify(todo));
      todosService.update(todo).then(function() {
        $scope.getAll();
      });
    };

    $scope.remove = function(todo) {
      todosService.remove(todo).then(function() {
        $scope.getAll();
      });
    };

  });
