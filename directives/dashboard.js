gifMakerApp.directive('dashboard', function() {
	return {
		restrict: 'AE',
		replace: 'true',
		templateUrl: 'directives/dashboard.html'
	}
});
gifMakerApp.controller('DashboardCtrl', function($scope) {
	$scope.generate = function() {
		renderUniverse(function() {
			console.log(arguments);
		});
	}
});
