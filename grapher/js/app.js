var app = angular.module('grapherApp', ['grapherApp.services', 'grapherApp.directives']);

app.controller("GrapherCtrl", function($scope, diffEq) {
  $scope.y_0 = 0;
  $scope.scale = 50;
  $scope.step_size = 10;

  $scope.slope_func = function(x, y) {
    return x*Math.cos(y);
  };

  $scope.$watch("y_0", function() {
    var field = diffEq.directionalField(
      $scope.slope_func, 
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

    console.log(approx.lines);
    var points = [],
        lines = [];

    points.push.apply(points, field.points);
    points.push.apply(points, approx.points);

    lines.push.apply(lines, field.lines);
    lines.push.apply(lines, approx.lines);

    $scope.plotData = {
      points: points, 
      lines: lines
    };

  });
});
