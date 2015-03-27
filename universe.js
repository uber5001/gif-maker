function getUniverse() {

        if (!window.universe) {

                window.universe = retrieveState();

                window.universe = window.universe || {
                        frames: [],
                        speed: 1,
                        dimensions: {
                        	height: 200,
        			width: 200,
        			origin: {
        				x: 0,
        				y: 0
        			}
                        },
        		currentPosition: -1,
        		filename: "myGIF",
                        frameDuration: 50
                };
        }

        window.univ = {univStr: window.universe};
        return window.universe;
}


/* Pass canvas element for image as well as position in array to insert, or -1 for a push. 
 * Returns number of frames
 */
function addFrame(imageData,index) {
        index = (index === undefined) ? -1 : index;
        var u = window.universe;
        
        frame = {
                image: imageData,
                duration: u.frameDuration,
				crop: {
					top: 0,
					left: 0,
					width: 200,
					height: 200
				}
        }

        if(index < 0) {
                u.frames.push(frame);
        } else {
                u.frames.splice(index,0,frame);
        }
        return u.frames.length;
}

function removeFrame(index) {
        var u = window.universe;
        u.frames.splice(index,1);
        return u.frames.length;
}

/* Renders frames into gif using gif.js
 * Pass callback "onDone" in form of function(blob)
 */
function renderUniverse(onDone) {
	onDone();
        try {
        var u = window.universe;
        var gif = new GIF({
                workers: 2,
                workerScript: "bower_components/gif.js/dist/gif.worker.js",
                quality: 10,
				width: universe.dimensions.width,
				height: universe.dimensions.height
        });
        for(i in u.frames) {
                var frame = u.frames[i];
		var img = document.createElement("img");
		img.setAttribute('src',frame.image);
                gif.addFrame(img, {delay: frame.duration/u.speed});
        }
        gif.on('finished',onDone);
        gif.render();
        } catch(e) {
                console.log(e.stack);
        }
}

function moveFrame(index, offset) {
        var u = window.universe;
        var frame = u.frames.splice(index,1);
        u.frames.splice(index+offset,0,frame[0]);
}

observeAndSave(getUniverse());
