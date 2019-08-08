(function () {
	'use strict';

	var app = angular.module('adminApp');
	
	app.controller('IndexCtrl', ['$rootScope', '$scope', '$state', '$log',
		function ($rootScope, $scope, $state,  $log) {
			var ctrl = this;
			
			$rootScope.myState = '';

			$scope.$on("$destroy", function () {
			});
			ctrl.$onInit = function () {
				ctrl.initCtrl();
			};

			ctrl.initCtrl = function () {
				$log.debug("--- index initCtrl() ");
            };
    }]);

    // http://blog.jeonghwan.net/server-side-loggin-in-angular/
    app.factory('$exceptionHandler', ['$injector', function ($injector) {
        return function (exception, cause) {
            var log = $injector.get('$log');
        };
	}]);

	// Migrate to: UI-Router 1.0 Trace service
	app.run(['$rootScope', '$transitions', '$trace', function($rootScope, $transitions, $trace) {
		// $trace.enable('TRANSITION');
		$transitions.onStart({ to: 'main.**' }, function(trans) {
			console.log("-=---- onStart : ", trans.router.stateService.current.name);
		});
		$transitions.onSuccess({ to: 'main.**' }, function(trans, a, b, c) {
			console.log("-=---- onSuccess : ", trans.router.stateService.current.name);
			$rootScope.myState = trans.router.stateService.current.name;
		});
	}]);

})();
