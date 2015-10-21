'use strict';

angular.module('todosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('todos', {
        url: '/todos',
        templateUrl: 'app/todos/todos.html',
        controller: 'TodosCtrl'
      });
  });
