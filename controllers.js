var gifMakerApp = angular.module('gifMakerApp', []);

gifMakerApp.config(["$sceProvider", function($sceProvider) {
	$sceProvider.enabled(false); //disables some angular security
}]);

gifMakerApp.controller('FilmstripCtrl', function($scope, $timeout) {
	$scope.universe = getUniverse();

	$scope.removeFrame = function(index) {
		removeFrame(index + 1);	
		$timeout(function() {
			updatePositions();	
		});
	}
	$scope.moveFrame = function(index, offset) {
		moveFrame(index, -offset);
		$timeout(function() {
			updatePositions();	
		});
	};
	var universe = getUniverse();
	
	function updatePositions() {
		for (var i = 0; i < universe.frames.length; i++) {
			universe.frames[i].$$index = i;
		}
	}

	//create a single hidden element for picking files
	var filePicker = document.createElement('input');
	filePicker.setAttribute('type', 'file');
	filePicker.setAttribute('accept', '*');
	//filePicker.setAttribute('multiple', 'true');
	filePicker.onchange = function() {
		var files = filePicker.files;
		if (files.length == 0) {
			console.log("wasn't expecting 0 files!");
			return;
		}
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			var reader = new FileReader();
			// generate a new function scope and pass in
			// "file", so that it doesn't get lost in the
			// next iteration
			reader.onload = (function(file) {
				return function(e) {
					//render to page
					addFrame(e.target.result);
					updatePositions();
					$scope.$apply();
				}
			})(file);
			reader.readAsDataURL(file);
		}
		filePicker.value = '';
	}
	$scope.pickFile = function() {
		filePicker.click();
	}
	//$scope.$watchCollection('universe.frames', function() {console.log(arguments);})
});
