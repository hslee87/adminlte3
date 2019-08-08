(function () {
	'use strict';

	var app = angular.module('adminApp');

	app.component('mainSidebar', {
		bindings: { },
		controller: MainSidebarController,
		controllerAs: 'vm',
		template: require('./main-sidebar.template.html')
	});

	MainSidebarController.$inject = ['$rootScope', '$scope', '$state', '$log' ];

	function MainSidebarController($rootScope, $scope, $state, $log) {
        var ctrl = this;
		ctrl.state = $state.current;
		$log.debug("State : ", $state.current)

		ctrl.$onDestroy = function () {
		};
		$scope.$on('$destroy', function () {
			$log.debug("MainSidebarController destroy2");
		});
		ctrl.$onInit = function () {
			ctrl.initCtrl();
		};
		ctrl.initCtrl = function () {
			$log.debug("MainSidebarController initCtrl()");
		}
	}
})();
