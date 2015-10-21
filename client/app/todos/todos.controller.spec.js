'use strict';

describe('Controller: TodosCtrl', function () {

  // load the controller's module
  beforeEach(module('todosApp'));

  var TodosCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TodosCtrl = $controller('TodosCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
