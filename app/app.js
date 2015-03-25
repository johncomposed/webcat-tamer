'use strict';

var wcTamer = angular.module('app', ['ngRoute']);

wcTamer.config( ['$compileProvider',
    function( $compileProvider ) {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
    }
]);

wcTamer.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl:'views/dash.html',
                controller: 'tamerCtrl'
            }).when('/hw/:id', {
                templateUrl:'views/hw.html',
                controller: 'hwCtrl'
            })
            .otherwise({redirectTo: '/'});
    });

wcTamer.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);
