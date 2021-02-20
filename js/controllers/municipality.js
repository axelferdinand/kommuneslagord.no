// Municipality
"use strict";
app.controller('municipality', ['$scope', '$rootScope', '$http', '$location', '$timeout', '$window', 'scroller', function($scope, $rootScope, $http, $location, $timeout, $window, scroller) {

	// Get data from Google Spreadsheet
	$scope.method = 'GET';
	$scope.url = 'https://spreadsheets.google.com/feeds/list/1payLLHFRTqViJN74Kl0HjdeH2YypoPnRcM5bl4v2qgg/1/public/values?alt=json';
	$scope.items = { loading: true, data: [] };

	$scope.kommune = 'Alvdal';

	// $scope.$route = $route;
	$scope.$location = $location;
	// $scope.$routeParams = $routeParams;

	$http({
		method: 'GET',
		url: $scope.url
	}).then(function successCallback(response) {
		// This callback will be called asynchronously when the response is available
		// Import $scope.items = response.data.extractorData.data[0].group
		$scope.items = response.data.feed.entry.map(function(entry) {
			return Object.keys(entry) // Remove all keys
			.filter(function(key) { // Filter everything that doesn't start with gsx$
				return key.substr(0, 4) === 'gsx$';
			})
			.reduce(function(res, key) { // Create the object
				var properKey = key.substr(4); // Create variables without gsx$
				res[properKey] = entry[key].$t; // Put the value on the response object
				return res;
			}, {});
		});






		// Loading successfull
		$scope.items.loading = false;

		$scope.municipality = 'Generator';
		$scope.municipalityGenerated = false;

		$scope.municipalityToggleView = function(view) {
			$scope.municipality = false;
			$scope.municipality = view;
		};

		$scope.municipalityGenerate = function() {
			$scope.municipalityGenerated = false;
			$scope.municipalityGenerated = true;
		};

	}, function errorCallback(response) {
		console.log('Ikkeno data, nei.') // If no data
	});

	// $scope.randomizedList = [];
	//
	// angular.forEach($scope.items, function(val) {
	// 	$scope.randomizedList.push({
	// 		value: val,
	// 		rank: 0.5 - $window.Math.random()
	// 	});
	// });


	$scope.random = function(items) {
		return items.sort(function() {
			return 0.5 - Math.random();
		});
	};

	// Update filter
	$scope.updateFilter = function(){

		var scrollToObj = document.querySelector('#list');

		$timeout(function(){
			scroller.scrollTo(document.body, objectTop(scrollToObj), 300);
		}, 100);
	};

}]);
