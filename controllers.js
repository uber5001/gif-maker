var gifMakerApp = angular.module('gifMakerApp', []);

gifMakerApp.controller('FilmstripCtrl', function($scope) {
	$scope.universe = getUniverse()
	$scope.removeFrame = removeFrame;
	$scope.moveFrame = moveFrame;
	var universe = getUniverse();
	var q = 1;
	function addContinuous() {
		addFrame("data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7");
		universe.frames[universe.frames.length-1].duration = q++;
		$scope.$apply();
		setTimeout(addContinuous, 100*q);
	}
	addContinuous();
});
