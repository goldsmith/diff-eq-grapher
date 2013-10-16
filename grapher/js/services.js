angular.module('grapherApp.services', []).
  factory("diffEq", function() {
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
  
        return plotData;
      }
    }
  });