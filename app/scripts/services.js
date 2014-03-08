angular.module('grapherApp.services', [])
  .service("utils", function() {
    this.Point = function(x, y, r) {
      return {
        x: x,
        y: y,
        r: r || 1.5
      }
    };

    this.objAppend = function() {
      // merge any number of objects together
      // by appending values of the objects
      // that have a common key
      var args = Array.prototype.slice.call(arguments),
          keys = Array.prototype.slice.call(Object.keys(args[0])),
          res = {};

      for (var i = 0; i < keys.length; i++) {
        var values = [];
        for (var j = 0; j < args.length; j++) {
          values.push.apply(values, args[j][keys[i]]);
        }
        res[keys[i]] = values;
      }

      return res;
    };
  })
  .service("plotData", function(utils) {
    var Point = utils.Point;

    this.new = function(width, height) {
        var plotData = {
          points: [],
          lines: []
        };

        return {
          addPoint: function(point) {
            plotData.points.push(CenteredPoint(point));
          },

          addLine: function(point1, point2, color, width) {
            plotData.lines.push({
              from: CenteredPoint(point1),
              to: CenteredPoint(point2),
              color: color,
              width: width || 1.0
            });
          },

          data: plotData
        }

        function CenteredPoint(point) {
          // convert a point for display
          // from a centered coordinate axis
          // to the canvas element
          return Point(
            point.x + width/2,
            point.y + height/2,
            point.r
          )
        }
    };
  })
  .service("diffEq", function(plotData, utils) {
    var Point = utils.Point;

    this.directionalField = function(slope_func, step_size, width, height, scale) {
      data = plotData.new(width, height);

      for (var x = 0; x < width; x += step_size) {
        for (var y = 0; y < height; y += step_size) {
          // center the coordinate axes on the plot
          point = Point(
            x - width/2,
            y - height/2
          );

          m = slope_func(point.x/scale, point.y/scale);
          deltax = 5/(Math.sqrt(1 + Math.pow(m, 2)));

          up = Point(point.x + deltax, point.y + m*deltax);
          down = Point(point.x - deltax, point.y - m*deltax);

          data.addLine(up, down, 'black');
        }
      }

      return data.data
    };

    this.eulerApproximation = function(y_0, slope_func, step_size, width, height, scale) {
      var data = plotData.new(width, height);

      var left = Point(0, y_0),
          right = Point(0, y_0);

      for (var x = 0; x < width/2; x += step_size) {
        left = _eulerApprox(left, -step_size);
        right = _eulerApprox(right, step_size);
      }

      function _eulerApprox(point, step_size) {
        data.addPoint(point);
        new_point = Point(
          point.x + step_size,
          point.y + step_size * slope_func(point.x/scale, point.y/scale)
        );
        data.addLine(point, new_point, 'blue');
        return new_point
      }

      return data.data
    };
  })
  .service("canvas", function() {
    this.Canvas = function(canvas) {
      var ctx = canvas.getContext('2d');

      return {
        clear: function() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        },
        drawPoint: function(point) {
          ctx.beginPath()
          ctx.arc(point.x, canvas.height - point.y, point.r, 0, Math.PI*2, true)
          ctx.closePath()
          ctx.fill()
        },

        drawLine: function(from, to, color, width) {
          ctx.strokeStyle = color;
          ctx.beginPath();
          ctx.moveTo(from.x, canvas.height - from.y);
          ctx.lineTo(to.x, canvas.height - to.y);
          ctx.lineWidth = width || 1.0;
          ctx.stroke()
          ctx.lineWidth = 1.0
        },

        dimensions: function() {
          return {width: canvas.width, height: canvas.height}
        }
      };
    };
    this.roomba = 5;
  });
