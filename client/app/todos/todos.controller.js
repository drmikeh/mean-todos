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
      todosService.add(todo).then(function(response) {
        $scope.newTodoName = '';
        $scope.getAll();
      });
    };

    $scope.update = function(todo) {
      todosService.update(todo).then(function(response) {
        $scope.getAll();
      });
    };

    $scope.remove = function(todo) {
      todosService.remove(todo).then(function(response) {
        $scope.getAll();
      });
    };

  });
