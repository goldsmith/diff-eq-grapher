'use strict';

var app = angular.module('grapher', []);
 
app.directive("graph", function () {
  return {
    restrict: "E",
    template: "<div id='graph'><canvas></canvas></div>",
 
    controller: function ($scope) {},
    link: function (scope, element) {},

  };
});
