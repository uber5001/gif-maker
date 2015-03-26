gifMakerApp.directive('filmstripItem', function() {
	return {
		restrict: 'AE',
		replace: 'true',
		templateUrl: 'directives/filmstripItem.html'
	}
});

gifMakerApp.controller('FilmstripItemCtrl', function($scope) {
	$scope.imgClick = function(index) {
		universe.currentPosition == index;
	}
	$scope.closeModal = function() {
		universe.currentPosition = 0;
	}
});
