(function () {
	'use strict';

	var app = angular.module('adminApp');
	
	app.controller('EmptyCtrl', ['$rootScope', '$scope',  function ($rootScope, $scope) {
		var ctrl = this;
		
		$scope.$on("$destroy", function () {
		});

		ctrl.$onInit = function () {
			ctrl.initCtrl();
		};

		ctrl.initCtrl = function () {
		};
    }]);
})();
