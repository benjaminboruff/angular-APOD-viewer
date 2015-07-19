/// <reference path="../../typings/angularjs/angular.d.ts"/>
(function () {
	'use strict';
	angular.module('app', [])
		.service('apodService', ['$http', function ($http) {
			this.get = function (apikey) {
				var apodUrl = "https://api.data.gov/nasa/planetary/apod?api_key=" + apikey + "&format=JSON";
				console.log('Hello, from apodService!');
				console.log(apikey);
				return $http.get(apodUrl)
					.then(function (res) {
						return res.data;
					},
						function (err) {
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
			vm.getApodData = function () {
				apodService.get(vm.apikey)
					.then(function (apodData) {
						vm.apodData = apodData;
						vm.video = false;
						if (vm.apodData.media_type === 'video') {
							vm.video = true;
						}
						console.log(vm.video);
						console.log(vm.apodData.url);
					});
			};
			vm.getApodData();
		}])
		.filter('trusted', ['$sce', function ($sce) {
			return function (url) {
				return $sce.trustAsResourceUrl(url);
			};
		}]);
})();