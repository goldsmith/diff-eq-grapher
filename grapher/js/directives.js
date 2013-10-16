angular.module("grapherApp.directives", []).
  directive("draw", function() {

  return function (scope, element, attrs) {

    var ctx = element[0].getContext('2d');

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

    scope.$watch(attrs.draw, function() {
      drawPoint(scope.plotData.points[0]);
    });

  }
});
