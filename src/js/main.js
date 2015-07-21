/// <reference path="../../typings/angularjs/angular.d.ts"/>
(function () {
	'use strict';
	angular.module('app', [])
		.service('apodService', ['$http', function ($http) {
			this.get = function (apikey, date) {
				var apodUrl = "https://api.data.gov/nasa/planetary/apod?" + date + "&api_key=" + apikey + "&format=JSON";
				console.log('Hello, from apodService!!!');
				console.log(apodUrl);
				return $http.get(apodUrl, { cache: true })
					.success(function (data, status, headers, config) {
						console.log('The headers are: ');
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
		.controller('ApodviewerCtrl', ['apodService', '$filter', function (apodService, $filter) {
			var vm = this;
			vm.apikey = "DEMO_KEY";
			vm.apodDate = $filter('date')(new Date(), 'yyyy-MM-dd');
			vm.apodDateStr = "date=" + vm.apodDate;
			console.log('The date is: ' + vm.apodDate + '\n');
			vm.getApodData = function () {
				apodService.get(vm.apikey, vm.apodDateStr)
					.then(function (apodObj) {
						vm.apodData = apodObj.data;
						vm.apodHeaders = apodObj.headers;
						vm.video = false;
						if (vm.apodData.media_type === 'video') {
							vm.video = true;
						}
						//console.log(vm.video);
						//console.log(vm.apodData);
						//console.log(vm.apodHeaders('X-RateLimit-Remaining'));
					});
			};
			vm.updateKey = function (key) {
				vm.apikey = key;
				console.log(vm.apikey);
				vm.getApodData();
			};
			vm.updateDate = function (dateStr) {
				vm.apodDateStr = "date=" + dateStr;
				console.log(vm.apodDateStr);
				vm.getApodData();
			};
			vm.prevDate = function (dateStr) {
				var tempAry = dateStr.split('-');
				var prev = parseInt(tempAry.pop()) - 1;
				tempAry.push(prev.toString());
				vm.apodDate = tempAry.join('-');
				vm.apodDateStr = "date=" + vm.apodDate;
				console.log(vm.apodDateStr);
				vm.getApodData();
			};
			vm.nextDate = function (dateStr) {
				var tempAry = dateStr.split('-');
				var next = parseInt(tempAry.pop()) + 1;
				tempAry.push(next.toString());
				vm.apodDate = tempAry.join('-');
				vm.apodDateStr = "date=" + vm.apodDate;
				console.log(vm.apodDateStr);
				vm.getApodData();
			};
			vm.futureDate = function (dateStr) {
				var todaysDate = $filter('date')(new Date(), 'yyyy-MM-dd');
				var d1 = Date.parse(dateStr);
				var d2 = Date.parse(todaysDate);
				if (d1 >= d2) {
					return true;
				}
			};
			vm.beforeApodDate = function (dateStr) {
				// the first APOD image was posted 1996-06-16
				var d1 = Date.parse(dateStr);
				var d2 = Date.parse('1996-06-16');
				if (d1 <= d2) {
					return true;
				}
			};
			vm.getApodData();
		}])
		.filter('trusted', ['$sce', function ($sce) {
			return function (url) {
				return $sce.trustAsResourceUrl(url);
			};
		}]);
})();