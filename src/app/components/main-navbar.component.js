(function () {
	'use strict';

	var app = angular.module('adminApp');

	app.component('mainNavbar', {
		bindings: {	},
		controller: MainNavbarController,
		controllerAs: 'vm',
		template: require('./main-navbar.template.html')
	});

	MainNavbarController.$inject = ['$scope', '$state', '$log'];

	function MainNavbarController($scope, $state, $log) {
        var ctrl = this;
        
		ctrl.$onDestroy = function () {
			$log.debug("MainNavbarController destroy1");
		};
		ctrl.$onInit = function () {
			ctrl.initCtrl();
		};

		ctrl.initCtrl = function () {
			$log.debug("MainNavbarController initCtrl()");
		};

	}
})();
