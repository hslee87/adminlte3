(function () {
	'use strict';

	var app = angular.module('adminApp');
	
	app.controller('MainCtrl', ['$scope', '$state', '$log', function ($scope, $state, $log) {
        var ctrl = this;
		$log.debug("MainCtrl start");

		ctrl.$onDestroy = function () {
			$log.debug("MainCtrl destroy1");
		};

		ctrl.$onInit = function () {
			ctrl.initCtrl();
		};

		ctrl.initCtrl = function () {
			$log.debug("MainCtrl initCtrl()...");
		};
	}]);
})();