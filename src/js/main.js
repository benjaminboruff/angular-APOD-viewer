/// <reference path="../../typings/angularjs/angular.d.ts"/>
(function () {
	'use strict';
	angular.module('app', ['controllers','services'])
		//.service('apodService', ApodService)
		//.controller('ApodviewerCtrl', ApodViewerCtrl)
		.filter('trusted', ['$sce', function ($sce) {
			return function (url) {
				return $sce.trustAsResourceUrl(url);
			};
		}]);
})();