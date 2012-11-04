;
// Sive global object
var Sive = {

	element : document.getElementById("Sive"),
	settings : {
		breakpoints: {
			1150: "1150.css",
			1550: "1550.css",
			830: "830.css",
		},
		fallback: "default.css",
		path: "/css/Sive/",
	},
	width : null
};

// Sort breakpoints
Sive.settings.breakpoints = sortBreakpoints(Sive.settings.breakpoints);

// Create the element if it doesn't exist
if(!Sive.element) {
	Sive.element = document.createElement("link");
	Sive.element.setAttribute("id", "Sive");
	Sive.element.setAttribute("rel", "stylesheet");
	
	// Append to the head
	document.getElementsByTagName('head')[0].appendChild(Sive.element);
}

// Sive run function
function SiveRun() {

	var last = 0, stylesheet = null, width = null;
	
	// Width grabbing for all browsers
	if (typeof window.innerWidth != 'undefined') {
		width = window.innerWidth;
	}	else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
		width = document.documentElement.clientWidth;
	} else {
		width = document.getElementsByTagName('body')[0].clientWidth;
	}
	
	// Set global width
	Sive.width = width;
	
	// Loop through breakpoints
	for(var k in Sive.settings.breakpoints) {
		if (Sive.settings.breakpoints.hasOwnProperty(k)) {
	 		if(Sive.width>=last && Sive.width<=k) {
	 			stylesheet = Sive.settings.breakpoints[k];
	 		}
	 	last = k;
		}
	}
	
	// No breakpoint was matched
	if(!stylesheet) {
		stylesheet = Sive.settings.fallback;
	}
	
	// Set proper CSS
	if( Sive.element.getAttribute("href") != (Sive.settings.path + stylesheet) ) {
		Sive.element.setAttribute("href", Sive.settings.path + stylesheet);
	}
}

// Object sorting function
function sortBreakpoints(o) {
	var sorted = {},
	key, a = [];

	for (key in o) {
		if (o.hasOwnProperty(key)) {
			a.push(key);
		}
	}

	a.sort();
	key=a.length;

	while(key--) {
		sorted[a[key]] = o[a[key]];
	}
	return sorted;
}

// Initial run
SiveRun();
// Onresize run
window.onresize = SiveRun;