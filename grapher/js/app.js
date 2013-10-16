'use strict';



var app = angular.module('grapher', []);



app.directive("graph", function() {
  return {
    restrict: "E",
    template: "<div id='graph'><canvas></canvas></div>",
  
    controller: function ($scope, $element) {

      console.log(this, $scope)

      var context = $element.find('canvas'),
          ctx = context[0].getContext('2d');

      function drawPoint(point) {
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.r, 0, Math.PI*2, true)
        ctx.closePath()
        ctx.fill()
      };
  
      function drawLine(from, to, color, width) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.lineWidth = width || 1.0;
        ctx.stroke()
        ctx.lineWidth = 1.0
      };

      console.log(this, $scope)
      $scope.$watch('plotData', function() {
        console.log(this)
        drawPoint($scope.plotData.points[0]);
      });

    },
  }
});

app.factory("graph", function() {

  return {
    plot: function() {
      var plotData = {
        points: [],
        lines: []
      };

      plotData.points.push({
        x: 10,
        y: 10,
        r: 10
      });

      return plotData
    }
  }
});

app.controller("GraphCtrl", function($scope, graph) {
  $scope.y_0 = 0;

  $scope.$watch("y_0", function() {
    $scope.plotData = graph.plot();
  });

  console.log($scope)
});
