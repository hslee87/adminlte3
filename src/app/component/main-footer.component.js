(function () {
	'use strict';

	var app = angular.module('adminApp');

	app.component('mainFooter', {
		bindings: {	id: '@',
		text: '@',
		data: '<'
		},
		controller: MainFooterController,
		controllerAs: 'vm',
		template: require('./main-footer.template.html')
	});

	MainFooterController.$inject = ['$scope', '$state', '$log'];

	function MainFooterController($scope, $state, $log) {
        var ctrl = this;
        
		ctrl.$onInit = function () {
			ctrl.initCtrl();
		};

		ctrl.initCtrl = function () {
			$log.debug("MainFooterController initCtrl()");
		};
	}
})();
