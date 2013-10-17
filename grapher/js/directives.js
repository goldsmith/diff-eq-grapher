angular.module("grapherApp.directives", []).
  directive("draw", function() {

  return function (scope, element, attrs) {

    var context = element[0],
        ctx = element[0].getContext('2d');

    function drawPoint(point) {
      ctx.beginPath()
      ctx.arc(point.x, context.height - point.y, point.r, 0, Math.PI*2, true)
      ctx.closePath()
      ctx.fill()
    };

    function drawLine(from, to, color, width) {
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(from.x, context.height - from.y);
      ctx.lineTo(to.x, context.height - to.y);
      ctx.lineWidth = width || 1.0;
      ctx.stroke()
      ctx.lineWidth = 1.0
    };

    scope.$watch(attrs.draw, function() {
      console.log(scope.plotData);
      ctx.clearRect(0, 0, context.width, context.height)
      _.each(scope.plotData.points, drawPoint);
      _.each(scope.plotData.lines, function(e) {
        drawLine(e.from, e.to, e.color, e.width)
      });
    });

    scope.canvas_width = context.width;
    scope.canvas_height = context.height;
  }
});
