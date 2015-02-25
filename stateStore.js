/* 
	observeAndSave()
	Call once. Pass the universe object to be observed 
	and saved on every change.
	Callback signature: function(currentStateOfSavedUniverse)
	Error function signature: function(errorMessage) [optional]

	Example in test/lsExample.html
*/

function observeAndSave (universe, callback, err) {

	this.calls = (this.calls || 0) + 1;

	if (this.calls > 1) {
		if (err!=null)
			err("WARNING: Multiple calls to observeAndSave. Object already being observed. Call ignored");
	}
	else {
		try {

			var observer = new ObjectObserver(universe);
			observer.open(function(added, removed, changed, getOldValueFn) {
				localStorage.setItem('universe', JSON.stringify(observer.value_));
				callback(observer.value_);
			});

		}
		catch(e) {
			if (err!=null)
				err("ERROR: Failed to observe");
		}
	}
}


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
