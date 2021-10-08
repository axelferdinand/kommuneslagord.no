// Municipality
"use strict";
app.controller('municipality', ['$scope', '$rootScope', '$http', '$location', '$timeout', '$window', 'scroller', function($scope, $rootScope, $http, $location, $timeout, $window, scroller) {

	// Get data from Google Spreadsheet
	$scope.method = 'GET';
	$scope.url = 'https://sheets.googleapis.com/v4/spreadsheets/1payLLHFRTqViJN74Kl0HjdeH2YypoPnRcM5bl4v2qgg/values/Kommuneslagord?key=AIzaSyBAlu3GkZtO9V6sh_HUH6Wah6NRTyRd1kE';
	$scope.items = { loading: true, data: [] };

	$scope.setTitle = function(title) {
		$scope.title = title;
	};

	$scope.setDescription = function(title) {
		$scope.description = title;
	};

	// $scope.$route = $route;
	$scope.$location = $location;
	// $scope.$routeParams = $routeParams;

	$http({
		method: 'GET',
		url: $scope.url
	}).then(function successCallback(response) {

		// This callback will be called asynchronously when the response is available
		$scope.items = response.data.values;

		// Delete first row (headers in the spreadsheet)
		delete $scope.items[0];

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
