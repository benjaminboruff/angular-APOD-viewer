/// <reference path="../../typings/angularjs/angular.d.ts"/>
(function () {
	'use strict';
	angular.module('app', [])
		.service('apodService', ['$http', function ($http) {
			this.get = function (apikey) {
				var apodUrl = "https://api.data.gov/nasa/planetary/apod?api_key=" + apikey + "&format=JSON";
				console.log('Hello, from apodService!');
				console.log(apikey);
				return $http.get(apodUrl, { cache: true })
					.success(function (data, status, headers, config) {
						console.log("HERE!");
						console.log(headers());
						return {
							"data": data,
							"headers": headers
						};
					})
					.error(function (data, status, headers, config) {
						return {
							message: "There has been an error in your request. Please try again later.",
							error: "Admins are on it!"
						};
					});
			};
		}])
		.controller('ApodviewerCtrl', ['apodService', function (apodService) {
			var vm = this;
			vm.apikey = "DEMO_KEY";
			vm.altkey = "";
			vm.getApodData = function () {
				apodService.get(vm.apikey)
					.then(function (apodObj) {
						vm.apodData = apodObj.data;
						vm.apodHeaders = apodObj.headers;
						vm.video = false;
						if (vm.apodData.media_type === 'video') {
							vm.video = true;
						}
						console.log(vm.video);
						console.log(vm.apodData);
						console.log(vm.apodHeaders('X-RateLimit-Remaining'));
					});
			};
			vm.update = function (key) {
				vm.apikey = key;
				console.log(vm.apikey);
				vm.getApodData();
			};
			vm.getApodData();
		}])
		.filter('trusted', ['$sce', function ($sce) {
			return function (url) {
				return $sce.trustAsResourceUrl(url);
			};
		}]);
})();