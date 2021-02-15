// @codekit-prepend "vendors/angular.min.js";

"use strict";

// Init
var app = angular.module('prototypen', ['tooltips']);

// Config
app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');

});

// Scroll to with animation
app.factory('scroller', function() {
	//t = current time
	//b = start value
	//c = change in value
	//d = duration
	var easeInOutQuad = function(t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2*t*t + b;
		t--;
		return -c/2 * (t*(t-2) - 1) + b;
	};

	function scrollTo(element, to, duration) {
		var element = document.scrollingElement || document.documentElement;

		var start = element.scrollTop,
			change = to - start,
			currentTime = 0,
			increment = 20;

		var animateScroll = function(){
			currentTime += increment;
			var val = easeInOutQuad(currentTime, start, change, duration);
			element.scrollTop = val;

			if(currentTime < duration) {
				setTimeout(animateScroll, increment);
			}
		};
		animateScroll();
	}

	return { scrollTo: scrollTo };
});

// Get element top pos relative to the page
function getPos(el) {
	for (var lx = 0, ly = 0;
		el !== null;
		lx += el.offsetLeft,
		ly += el.offsetTop,
		el = el.offsetParent);

		return {
			x: lx,
			y: ly
		};
	}

// Get element top pos relative to the page
function objectTop(obj) {
	var curtop = 1;

	if (obj.offsetParent) {
		do {
			curtop += obj.offsetTop;

		} while (obj = obj.offsetParent);
	}
	return curtop;
}

// Controllers
// @codekit-append "controllers/municipality.js";

// Directives
// @codekit-append "directives/bind-focus.js";
// @codekit-append "directives/enter-key.js";
// @codekit-append "directives/esc-key.js";
// @codekit-append "directives/scroll-to.js";
// @codekit-append "directives/angular-tooltips.js";
