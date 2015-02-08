function getUniverse() {
        window.universe = window.universe || {
                frames: [],
                speed: 1,
                dimensions: {
                	height: 0,
			width: 0,
			origin: {
				x: 0,
				y: 0
			}
                },
		currentPosition: 0,
		filename: "",
                frameDuration: 50
        };
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
                duration: u.frameDuration
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
        try {
        var u = window.universe;
        var gif = new GIF({
                workers: 2,
                workerScript: "bower_components/gif.js/dist/gif.worker.js",
                quality: 10
        });
        for(i in u.frames) {
                var frame = u.frames[i];
                gif.addFrame(frame.image, {delay: frame.duration/u.speed});
        }
        gif.on('finished',onDone);
        gif.render();
        } catch(e) {
                console.log(e.stack);
        }
}
