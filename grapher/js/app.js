var app = angular.module('grapherApp', ['grapherApp.services', 'grapherApp.directives']);

app.controller("GrapherCtrl", function($scope, utils, diffEq) {
  $scope.y_0 = 250;
  $scope.scale = 50;
  $scope.step_size = 10;

  $scope.slope_func = function(x, y) {
    return x*Math.cos(y);
  };

  $scope.$watch("y_0", function() {
    var field = diffEq.directionalField(
      $scope.slope_func,
      $scope.step_size,
      $scope.canvas_width,
      $scope.canvas_height,
      $scope.scale
    );

    var approx = diffEq.eulerApproximation(
      $scope.y_0,
      $scope.slope_func,
      $scope.step_size,
      $scope.canvas_width,
      $scope.canvas_height,
      $scope.scale
    );

    $scope.plotData = utils.objAppend(field, approx);
  });
});
