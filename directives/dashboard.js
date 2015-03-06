gifMakerApp.directive('dashboard', function() {
	return {
		restrict: 'AE',
		replace: 'true',
		templateUrl: 'directives/dashboard.html'
	}
});

gifMakerApp.controller('DashboardCtrl', function($scope) {
	$scope.validateNumber = function($event) {
		var numRegex = /^\d*(\.\d+)?$/ ;
		console.log($event.target.value);
		if(numRegex.test($event.target.value)){
			universe[$event.target.name] = $event.target.value;
		}
		else {
			alert("Please enter a valid number");
			$event.target.value = universe.$event.target.name;
		}
	}
});
