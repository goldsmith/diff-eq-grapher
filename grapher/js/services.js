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

    function CenteredPoint(point, width, height) {
      // convert a point on a canvas where (0, 0) is
      // on the bottom left to a point on a canvas where
      // (0, 0) is in the center
      return Point(
        point.x + width/2,
        point.y + height/2,
        point.r
      )
    }

    function BottomLeftPoint(point, width, height) {
      // convert a point on a canvas where (0, 0) is
      // in the center to a point on a canvas where
      // (0, 0) is on the bottom left corner
      return Point(
        point.x - width/2,
        point.y - height/2,
        point.r
      )
    }

    this.directionalField = function(slope_func, width, height, scale) {
      data = plotData.new();

      for (var x = 0; x < width; x += 10) {
        for (var y = 0; y < height; y += 10) {
          // center the coordinate axes on the plot
          point = BottomLeftPoint(Point(x, y), width, height);

          m = slope_func(point.x/scale, point.y/scale);
          deltax = 5/(Math.sqrt(1 + Math.pow(m, 2)));

          up = Point(point.x + deltax, point.y + m*deltax);
          down = Point(point.x - deltax, point.y - m*deltax);

          // reattach point to display coordinates
          data.addLine(
            CenteredPoint(up, width, height),
            CenteredPoint(down, width, height),
            'black'
          );
        }
      }
  
      return data.data
    };

    this.eulerApproximation = function(y_0, slope_func, step_size, width, height, scale) {
      var data = plotData.new();

      var left = Point(0, 0),
          right = Point(0, 0);

      for (var x = 0; x < width/2; x += step_size) {
        left = _eulerApprox(left, -step_size);
        right = _eulerApprox(right, step_size);
      }

      function _eulerApprox(point, step_size) {
        data.addPoint(CenteredPoint(point, width, height));
        new_point = Point(
          point.x + step_size,
          point.y + step_size * slope_func(point.x/scale, point.y/scale) 
        );
        data.addLine(CenteredPoint(point, width, height), CenteredPoint(new_point, width, height), 'blue');
        return new_point
      }

      return data.data
    }
  })