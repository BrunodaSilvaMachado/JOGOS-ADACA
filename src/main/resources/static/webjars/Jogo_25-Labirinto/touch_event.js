function doubleclickdetect(el,callback){
	var touchsurface = el,
	startX,
	startY,
	distX,
	distY,
	isdouble,
	allowedTime = 60,
	restraint = 50,
	handledoubleclick = callback || function(isdouble){};
	
	touchsurface.addEventListener('touchstart', function(e){
		var touchobj = e.changedTouches[0];
		isdouble = false;

		startX = touchobj.pageX;
		startY = touchobj.pageY;
		startTime = new Date().getTime(); // record time when finger first makes contact with surface<font><
		e.preventDefault();
	}, false);

	touchsurface.addEventListener('touchmove', function(e){
		e.preventDefault(); // prevent scrolling when inside DIV
	}, false);

	touchsurface.addEventListener('touchend', function(e){
		var touchobj = e.changedTouches[0];
		distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with sur
		distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surfa
		elapsedTime = new Date().getTime() - startTime; // get time elapsed
		if (elapsedTime <= allowedTime){ // first condition for awipe met
			isdouble = (Math.abs(distX) <= restraint) && (Math.abs(distY) <= restraint);
		}
		handledoubleclick(isdouble);
		e.preventDefault();
	}, false);
}

function swipedetect(el, callback){
	var touchsurface = el,
	swipedir,
	startX,
	startY,
	distX,
	distY,
	threshold = 150, //required min distance traveled to be considered swipe
	restraint = 100, // maximum distance allowed at the same time in perpendicular direction
	allowedTime = 300, // maximum time allowed to travel that distance
	elapsedTime,
	startTime,
	handleswipe = callback || function(swipedir){};

	touchsurface.addEventListener('touchstart', function(e){
		var touchobj = e.changedTouches[0];
		swipedir = 'none';
		/*swipedetect() accepts two parameters, the element to bind the touch events to, plus a function to execute when a swipe has occurred.
		The function parameter "swipedir" tells you the type of swipe that was just made with five possible values: "none", "left", "right", "top", or
		"down".
		The below uses the swipedetect() function to show a "left", "right", "top", or "down" background image (overlaid on top of a default
		background image) depending on the swipe that has just occurred:
		Example (mouse simulation added for non touch devices):
		Swipe Me*/

		dist = 0;
		startX = touchobj.pageX;
		startY = touchobj.pageY;
		startTime = new Date().getTime(); // record time when finger first makes contact with surface<font><
		e.preventDefault();
	}, false);

	touchsurface.addEventListener('touchmove', function(e){
		e.preventDefault(); // prevent scrolling when inside DIV
	}, false);

	touchsurface.addEventListener('touchend', function(e){
		var touchobj = e.changedTouches[0];
		distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with sur
		distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surfa
		elapsedTime = new Date().getTime() - startTime; // get time elapsed
		if (elapsedTime <= allowedTime){ // first condition for awipe met
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizon
				swipedir = (distX < 0)? 'left' : 'right'; // if dist traveled is negative, it indicates left
			}
			else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for ve
				swipedir = (distY < 0)? 'up' : 'down'; // if dist traveled is negative, it indicates up swip
			}
		}
		handleswipe(swipedir);
		e.preventDefault();
	}, false);
}

//USAGE:
/*
var el = document.getElementById('someel')
swipedetect(el, function(swipedir){
swipedir contains either "none", "left", "right", "top", or "down"
if (swipedir =='left')
alert('You just swiped left!')
})
*/