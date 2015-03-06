gifMakerApp.directive('dashboard', function() {
	return {
		restrict: 'AE',
		replace: 'true',
		templateUrl: 'directives/dashboard.html'
	}
});
gifMakerApp.controller('DashboardCtrl', function($scope) {
	$scope.generate = function() {
		renderUniverse(function(blob) {
			var a = document.createElement('a');
			a.href = window.URL.createObjectURL(blob);
			a.download = "foo.gif";
			a.click();
		});
	}
});
