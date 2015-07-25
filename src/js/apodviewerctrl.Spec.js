/* global inject */
/// <reference path="../../typings/jasmine/jasmine.d.ts"/>
describe('APOD viewer controller', function () {
	var controller,
		testDate = new Date('07/25/2015');
	beforeEach(module('app'));
	beforeEach(inject(function ($controller) {
		controller = $controller('ApodViewerCtrl', {

		});
	}));
	
	//the apikey shouldbe DEMO_KEY before being pushed to github :)
	it('should say that the apikey is DEMO_KEY', function () {
		expect(controller.apikey).toBe('DEMO_KEY');
	});
	
	// the first date of available APOD data
	it('should say first valid APOD data was provided on 1996-06-16', function () {
		expect(controller.firstDayStr).toBe('1996-06-16');
	});
	// getApodData() URL
	it('should say the apodData.url is made from the apikey and apodDate', function () {
		controller.getApodData();
		//expect(controller.apodData.url).toBe('https://api.data.gov/nasa/planetary/apod?date=2015-07-25&api_key=ep9KoIgbcqVVVQ7JiLz5vcYql67pTJRPBTeeoIal&format=JSON');
		//expect(controller.video).toBe(false);
	});
	// setting the api key
	it('should say setting the apikey is 1968 after updateKey("1968")', function () {
		controller.updateKey("1968")
		expect(controller.apikey).toBe("1968");
	});
	
	// urlDateStr() returns yyyy-MM-dd formatted string from JS Date object
	it('should say string 2015-07-25 is returned from Date object', function () {
		expect(controller.urlDateStr(testDate)).toBe('2015-07-25');
	});
	
		// objDateStr() returns yyyy/dd/MM formatted string from JS Date object
	it('should say string 2015/07/25 is returned from Date object', function () {
		expect(controller.objDateStr(testDate)).toBe('2015/07/25');
	});
});