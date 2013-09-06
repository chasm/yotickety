'use strict';

describe('Controller: GameCtrl', function () {

  // load the controller's module
  beforeEach(module('Tickety', 'Tickety.controllers', 'Tickety.services'));

  var GameCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GameCtrl = $controller('GameCtrl', {
      $scope: scope
    });
  }));

  it('should set gameboards to a blank board', function () {
    expect($scope.gameboards).toBe([ '         ' ]);
  });
  
  // it('should set goHome to true', function() {
  //   expect(scope.goHome).toBe(true);
  // })
});
