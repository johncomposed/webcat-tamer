'use strict';

var wcTamer = angular.module('app', []);


wcTamer.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);