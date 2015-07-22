/// <reference path="../../typings/angularjs/angular.d.ts"/>
(function () {
	'use strict';
	angular.module('app', [])
		.service('apodService', ['$http', function ($http) {
			//apodService.get function takes an API_KEY string
			//and a date="yyyy-MM-dd" string
			this.get = function (apikey, dateStr) {
				var apodUrl = "https://api.data.gov/nasa/planetary/apod?date="
					+ dateStr
					+ "&api_key="
					+ apikey
					+ "&format=JSON";
				console.log('Hello, from apodService!!!');
				console.log(apodUrl);
				return $http.get(apodUrl, { cache: true })
					.success(function (data, status, headers, config) {
						//console.log('The headers are: ');
						//console.log(headers());
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
			//apodDate is a Date() object with initial date as today's date
			vm.apodDate = new Date();
			//the URL needs to have the date as a string in yyyy-mm-dd format
			vm.apodDateStr = vm.apodDate.toISOString().substr(0, 10);
			// the first APOD image was posted 1996-06-16
			vm.firstDay = new Date('1996/06/16');
			vm.todaysDate = new Date(new Date().toISOString().substr(0,10).replace("-", "/"));
			console.log('The date is: ' + vm.apodDateStr + '\n');
			
			//function to retrieve APOD data
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
				vm.apodDateStr = dateStr;
				dateStr = dateStr.replace("-", "/");
				vm.apodDate = new Date(dateStr);
				console.log(vm.apodDateStr);
				vm.getApodData();
			};
			
			vm.prevDay = function () {
				vm.apodDate.setDate(vm.apodDate.getDate() - 1);
				vm.apodDateStr = vm.apodDate.toISOString().substr(0, 10);
				console.log(vm.apodDateStr);
				vm.getApodData();
			};
			
			vm.nextDay = function () {
				vm.apodDate.setDate(vm.apodDate.getDate() + 1);
				vm.apodDateStr = vm.apodDate.toISOString().substr(0, 10);
				console.log(vm.apodDateStr);
				vm.getApodData();
			};

			vm.beforeApodDate = function (dateStr) {
				dateStr = dateStr.replace("-", "/");
				var prevDay = new Date(dateStr);	
				if (prevDay <= vm.firstDay) {
					return true;
				}
			};

			vm.afterApodDate = function (dateStr) {
				dateStr = dateStr.replace("-", "/");
				var nextDay = new Date(dateStr);
				if (nextDay >= vm.todaysDate) {
					return true;
				}
			};
			
			vm.outsideApodDates = function (dateStr){
				dateStr = dateStr.replace('-', '/');
				var enteredDay = new Date(dateStr);
				if (enteredDay < vm.firstDay || enteredDay > vm.todaysDate) {
					return true;
				}
			};
			//initial getting of APOD data
			vm.getApodData();
		}])
		.filter('trusted', ['$sce', function ($sce) {
			return function (url) {
				return $sce.trustAsResourceUrl(url);
			};
		}]);
})();