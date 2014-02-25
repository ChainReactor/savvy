(function (context) {

	var ua = navigator.userAgent.toLowerCase();

	core.Module('savvy.Platform', {
		touch: 'ontouchstart' in window,

		ios:	(!!ua.match(/ipad/i) || 
				 !!ua.match(/iphone/i) || 
				 !!ua.match(/ipod/i)),

		android: !!ua.match('android')
	});

	savvy.Platform.pointer_start = savvy.Platform.touch ? 'touchstart' : 'mousedown';
	savvy.Platform.pointer_move = 	savvy.Platform.touch ? 'touchmove' : 'mousemove';
	savvy.Platform.pointer_end = 	savvy.Platform.touch ? 'touchend' : 'mouseup';

})(this);