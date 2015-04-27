/* 
	observeAndSave()
	Call once. Pass the universe object to be observed 
	and saved on every change.
	Callback signature: function(currentStateOfSavedUniverse)
	Error function signature: function(errorMessage) [optional]

	Example in test/lsExample.html
*/

(function(){

	var calls = 0;

	window.observeAndSave = function (universe, callback, err) {

		calls++;

		if (calls > 1) {
			if (err!=null)
				err("WARNING: Multiple calls to observeAndSave. Object already being observed. Call ignored");
		}
		else {
			try {
				setInterval(function(){
				    localStorage.setItem('universe', JSON.stringify(universe));
				}, 100);

			}
			catch(e) {
				if (err!=null)
					err("ERROR: Failed to observe");
			}
		}
	}
})();


/*
	retrieveState()
	Returns current state of universe object from
	localStorage. Takes err() callback with signature:
	function(errorMessage) [optional]
*/

function retrieveState (err) {
	var universe = localStorage.getItem('universe');
	if (universe===null || universe===undefined || universe==={}) {
		if (err!=null)
			err("ERROR: Local storage does not have a universe object");
		return null;
	}
	return JSON.parse(universe);
}
