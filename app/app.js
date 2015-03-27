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
                controller: 'dashCtrl'
            }).when('/all', {
                templateUrl:'views/allhw.html',
                controller: 'dashCtrl'
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

wcTamer.filter('searchFor', function(){
// {inputData:argument} here is (searchFor:searchString)
	return function(arr, searchString){
		if(!searchString){
			return arr;
		}
		var result = [];
		searchString = searchString.toLowerCase();

		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(item){
			if(item.title.toLowerCase().indexOf(searchString) !== -1 || item.content.toLowerCase().indexOf(searchString) !== -1){
				result.push(item);
			}
		});
		return result;
	};
});


