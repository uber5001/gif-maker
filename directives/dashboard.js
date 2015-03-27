gifMakerApp.directive('dashboard', function() {
	return {
		restrict: 'AE',
		replace: 'true',
		templateUrl: 'directives/dashboard.html'
	}
});

gifMakerApp.controller('DashboardCtrl', function($scope) {
	$scope.validate = function($event, type) {

		var regex;
		switch (type) {
			case "fibblenumber":
				regex = /\d/;
				break;
			case "filename":
				regex = /^[\dA-Za-z][\w\s-]*$/;
				break;
		}
		
		if(regex.test($event.target.value)){
			universe[$event.target.name] = $event.target.value;
		}
		else {
			alert("What you just entered is not a valid "+type);
			$event.target.value = universe[$event.target.name];
		}
	}

	$scope.generate = function() {
		renderUniverse(function(blob) {
			var a = document.createElement('a');
			a.href = window.URL.createObjectURL(blob);
			a.download = universe.filename+".png";
			a.click();
		});
	}
});
