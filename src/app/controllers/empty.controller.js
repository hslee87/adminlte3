// ES5 Style
/*
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
*/
// ES6 Style
'use strict'

// import angular from 'angular'

class EmptyCtrl {
	constructor($rootScope, $scope, $http) {
		console.log("-- Constructor")
		// member variables
		this.vm = this;
		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.$http = $http;
	}

	$onInit() {
		this.initCtrl()
	}

	async initCtrl() {
		let t = await this.esTest()
		// use $scope.$apply() if needed
		console.log('--- initCtrl() t = ', t)
	}

	async esTest() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('esTest')
			}, 1000)
		})
	}
}

EmptyCtrl.$inject = ['$rootScope', '$scope', '$http'];
angular.module('adminApp').controller('EmptyCtrl', EmptyCtrl);
