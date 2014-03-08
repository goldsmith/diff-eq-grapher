angular.module('grapherApp.directives', ['grapherApp.services'])
  .directive("draw", function(canvas) {
    return function (scope, element, attrs) {
      var myCanvas = canvas.Canvas(element[0]);

      scope.$watch(attrs.draw, function() {
        myCanvas.clear();

        _.each(scope[attrs.draw].points, function(point) {
          myCanvas.drawPoint(point);
        });

        _.each(scope[attrs.draw].lines, function(line) {
          myCanvas.drawLine(line.from, line.to, line.color, line.width);
        });
      });

      var dimensions = myCanvas.dimensions();
      scope.canvas_width = dimensions.width;
      scope.canvas_height = dimensions.height;
    };
  });
