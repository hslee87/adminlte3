import * as angular from 'angular';

(function () {
	'use strict';

    var app = angular.module('adminApp', [
        'ngCookies',
        'ngFileUpload',        
        'ui.router']);

    // includes All required sources
    require('./app.requires');

    app.config(['$stateProvider', '$logProvider', '$locationProvider', '$urlRouterProvider',
        function( $stateProvider, $logProvider, $locationProvider, $urlRouterProvider) {

        // To view console log in chrome : check message level "verbose"
        // $logProvider.debugEnabled(false);

        $locationProvider.html5Mode({
            enabled: false, // 해당 옵션이 켜져 있으면 local에서는 Internet explorer 사용할 수 없음
            rewriteLinks: true
        });

        $urlRouterProvider.otherwise('/login');

        $stateProvider
        .state('login', {
            url: '/login',
            template: require('./views/login.html'),
            controller: 'EmptyCtrl as vm'
        })
        .state('main', {
            url: '/main',
            controller: 'MainCtrl as vm',
            template: require('./views/main.html')
        })
        .state('main.starter', {
            url: '/starter',
            controller: 'EmptyCtrl as vm',
            template: require('./views/main.starter.html')
        })
        ;
    }]);

    // app.run(['$state', function($state) {
    // }]);
})();