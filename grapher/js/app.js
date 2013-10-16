'use strict';

var app = angular.module('grapherApp', ['grapherApp.services', 'grapherApp.directives']);

app.controller("GrapherCtrl", function($scope, diffEq) {
  $scope.y_0 = 0;

  $scope.$watch("y_0", function() {
    $scope.plotData = diffEq.plot();
  });
});
