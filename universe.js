function getUniverse() {
        window.universe = window.universe || {
                frames: [],
                speedMultiper: 1,
                dimensions: {
                	height: 0,
			width: 0,
			origin: {
				x: 0,
				y: 0
			}
                },
		currentPosition: 0,
		filename: ""
        };
	return window.universe;
}
