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
                gif = new GIF({
                        workers: 2,
                        quality: 10
                });
        };
	return window.universe;
}


/* Pass canvas element for image as well as position in array to insert, or -1 for a push. 
 * Returns number of frames
 */
function addFrame(imageData,position) {
        var u = window.universe;
        
        frame = {
                image: imageData,
                duration: 30
        }

        if(posititon < 0) {
                u.frames.push(frame);
        } else {
                u.frames.splice(position,0,frame);
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
        var u = window.universe;
        for each(frame in u.frames) {
                u.gif.addFrame(frame.image, {delay: frame.duration/u.speed});
        }
        gif.on('finished',onDone);
        gif.render();
}


function demoRender() {
        var u = getUniverse();
        var 
}
