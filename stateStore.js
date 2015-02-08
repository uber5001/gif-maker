/* 
	observeAndSave()
	Call once. Pass the universe object to be observed 
	and saved on every change. Callback signature-
	function(changes, currentStateOfSavedUniverse)
	Error function signature: function(errorMessage) [optional]
*/

function observeAndSave (universe, callback, err) {

	this.calls = (this.calls || 0) + 1;

	if (this.calls > 1) {
		if (err!=null)
			err("WARNING: Multiple calls to observeAndSave. Object already being observed. Call ignored");
	}
	else {
		try {
			Object.observe(universe, function(changes){	
				localStorage.setItem('universe', JSON.stringify(universe));
				callback(changes, universe);
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
	if (universe==null) {
		if (err!=null)
			err("ERROR: Local storage does not have a universe object");
		return null;
	}
	return JSON.parse(universe);
}