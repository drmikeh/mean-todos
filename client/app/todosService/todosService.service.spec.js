'use strict';

describe('Service: todosService', function () {

  // load the service's module
  beforeEach(module('todosApp'));

  // instantiate service
  var todosService;
  beforeEach(inject(function (_todosService_) {
    todosService = _todosService_;
  }));

  it('should do something', function () {
    expect(!!todosService).toBe(true);
  });

});
