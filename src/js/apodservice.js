(function () {
	'use strict';
	angular.module('services')
		.service('apodService', ApodService);

	ApodService.$inject = ['$http'];
	function ApodService($http) {
		//apodService.get function takes an API_KEY string
		//and a date="yyyy-MM-dd" string
		var vm = this;
		vm.get = function (apikey, dateStr) {
			var apodUrl = "https://api.data.gov/nasa/planetary/apod?date=" + dateStr + "&api_key=" + apikey + "&format=JSON";
			console.log('Hello, from ApodService!!!');
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
	}
})();