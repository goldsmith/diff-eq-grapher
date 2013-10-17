var app = angular.module('grapherApp', ['grapherApp.services', 'grapherApp.directives']);

app.controller("GrapherCtrl", function($scope, diffEq) {
  $scope.y_0 = 0;
  $scope.scale = 50

  $scope.slope_func = function(x, y) {
    return x*Math.cos(y);
  };

  $scope.$watch("y_0", function() {
    $scope.plotData =  new diffEq.directionalField(
      $scope.slope_func, 
      $scope.canvas_width, 
      $scope.canvas_height,
      $scope.scale
    );
  });
});
