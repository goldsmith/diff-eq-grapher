angular.module('grapherApp.services', []).
  factory("plotData", function() {
    return { 
      new: function() {
        var plotData = {
          points: [],
          lines: []
        };
  
        return {
          addPoint: function(point) {
            plotData.points.push(point);
          },
  
          addLine: function(point1, point2, color, width) {
            plotData.lines.push({
              from: point1,
              to: point2,
              color: color,
              width: width || 1.0
            });
          },
  
          data: plotData
        }
      },
    }
  }).
  service("diffEq", function(plotData) {
    function Point(x, y, r) {
      return {
        x: x,
        y: y,
        r: r || 1.5
      }
    }

    this.directionalField = function(slope_func, width, height) {
      data = plotData.new();

      for (var x = 0; x < width; x += 10) {
        for (var y = 0; y < height; y += 10) {
          m = slope_func(x, y);
          deltax = 5/(Math.sqrt(1 + Math.pow(m, 2)));

          up = Point(x + deltax, y + m*deltax);
          down = Point(x - deltax, y - m*deltax);

          data.addLine(up, down, 'black');
        }
      }
  
      return data.data
    }
  })