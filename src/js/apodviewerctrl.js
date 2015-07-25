/// <reference path="../../typings/angularjs/angular.d.ts"/>
(function () {
	'use strict';
	angular.module('controllers')
		.controller('ApodViewerCtrl', ApodViewerCtrl);

	ApodViewerCtrl.$inject = ['apodService'];
	function ApodViewerCtrl(apodService) {
		var vm = this;

		vm.getApodData = getApodData;
		vm.updateKey = updateKey;
		vm.changeDate = changeDate;
		vm.prevDay = prevDay;
		vm.nextDay = nextDay;
		vm.beforeApodDate = beforeApodDate;
		vm.afterApodDate = afterApodDate;
		vm.outsideApodDates = outsideApodDates;
		vm.urlDateStr = urlDateStr;
		vm.objDateStr = objDateStr;
		
		//vm.apikey = "ep9KoIgbcqVVVQ7JiLz5vcYql67pTJRPBTeeoIal";
		vm.apikey = "DEMO_KEY";
		// the first APOD image was posted 1996-06-16
		vm.firstDay = new Date('1996/06/16');
		//apodData stores data pbject returned from APOD site
		vm.apodData = {};
		vm.video = false;
		//string version of firstDay for input max date in index.html
		vm.firstDayStr = "1996-06-16";
		vm.dateOptions = {year: "numeric",
						 month: "2-digit",
						   day: "2-digit"};

		//todaysDate should not change
		vm.todaysDate = new Date(objDateStr(new Date()));
		//todaysDateStr is used to set the max date in the input date picker
		//in index.html
		vm.todaysDateStr = urlDateStr(vm.todaysDate);
		vm.chosenDate = { date: new Date(urlDateStr(vm.todaysDate)),
						  dateStr:  urlDateStr(vm.todaysDate)};
		//console.log("The chosen date is: " + vm.chosenDate.date);
		//console.log("The chosen dateStr is: " + vm.chosenDate.dateStr);
		//apodDate is a Date() object with initial date as today's date
		//and changes depending on the date chosen via the date input
		vm.apodDate = new Date(objDateStr(vm.todaysDate));
		//console.log("The apodDate is: " + vm.apodDate);

		//initial getting of APOD data
		vm.getApodData();
		//function to retrieve APOD data
		function getApodData() {
			//the URL needs to have the date as a string in yyyy-mm-dd format
			vm.apodDateStr = urlDateStr(vm.apodDate);
			apodService.get(vm.apikey, vm.apodDateStr)
				.then(function (apodObj) {
					vm.apodData = apodObj.data;
					vm.apodHeaders = apodObj.headers;
					vm.video = false;
					if (vm.apodData.media_type === 'video') {
						vm.video = true;
					}
				});
		}

		function updateKey(key) {
			vm.apikey = key;
			vm.getApodData();
		}

		function changeDate() {
			console.log("The chosen date is: " + vm.apodDate);
			vm.getApodData();
		}

		function prevDay() {
			vm.apodDate.setDate(vm.apodDate.getDate() - 1);
			//console.log("PREV: " + vm.apodDate);
			vm.getApodData();
		}

		function nextDay() {
			vm.apodDate.setDate(vm.apodDate.getDate() + 1);
			//console.log("NEXT: " + vm.apodDate);
			vm.getApodData();
		}

		function beforeApodDate() {
			//console.log("IN beforeApodDate the apodDate is: " + vm.apodDate);
			if (vm.apodDate <= vm.firstDay ||
				typeof vm.apodDate === 'undefined') {
				return true;
			}
		}

		function afterApodDate() {
			//console.log("IN afterApodDate the apodDate is: " + vm.apodDate);
			if (vm.apodDate >= vm.todaysDate ||
				typeof vm.apodDate === 'undefined') {
				return true;
			}
		}

		function outsideApodDates() {
			if (vm.apodDate < vm.firstDay ||
				vm.apodDate > vm.todaysDate ||
				typeof vm.apodDate === 'undefined') {
				return true;
			}
		}

		function urlDateStr(dateObjUTC) {
			var locDateAry = dateObjUTC
								.toLocaleDateString('en-US', vm.dateOptions)
								.split('/');
			var year = locDateAry.pop();
			locDateAry.unshift(year);
			return locDateAry.join('-');
		}

		function objDateStr(dateObjUTC) {
			var locDateAry = dateObjUTC
								.toLocaleDateString('en-US', vm.dateOptions)
								.split('/');
			var year = locDateAry.pop();
			locDateAry.unshift(year);
			return locDateAry.join('/');
		}
	}
})();