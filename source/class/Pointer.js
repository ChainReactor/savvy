(function () {

	core.Module("savvy.Pointer", {
		normalize: function (evt) {
			if (evt.__normalized) return evt;

			if (savvy.Platform.touch) {
				var firstTouch = ("touchend" === evt.type ? evt.changedTouches : evt.touches)[0];
				evt.pointerX = firstTouch.pageX;
				evt.pointerY = firstTouch.pageY;
			} else {
				evt.pointerX = evt.pageX;
				evt.pointerY = evt.pageY;
			}

			evt.__normalized = true;

			return evt;
		},
/*
		tap: function (elem, cb) {
			elem = elem.constructor === String ? document.getElementById(elem) : elem;

			elem.addEventListener(savvy.Platform.pointer_start, function (evt) {
				cb ? cb(evt) : null;

				evt.preventDefault();
				return false;
			});
		},
*/
		tap: function (element, startCb, endCb, cancelCb) {
			var self =		this,
				target =	null,

				sX =		0,
				sY =		0,
				nX =		0,
				nY =		0,

				distance = savvy.Platform.touch ? 60 : 30,
				onTarget = true,

				startFn = function (evt) {
					evt = self.normalize(evt),
					sX = evt.pointerX,
					sY = evt.pointerY;

					if (startCb) {
						startCb(evt);
						onTarget = true;
						target = evt.target;

						document.body.addEventListener(savvy.Platform.pointer_move, moveFn);
						document.body.addEventListener(savvy.Platform.pointer_end, endFn);
						document.body.addEventListener("touchcancel", endFn);

						savvy.Dom.addClass(element, 'tapped');
					} 

					evt.preventDefault();

					return false;

				},

				moveFn = function (evt) {
					evt = self.normalize(evt),

					nX = evt.pointerX,
					nY = evt.pointerY,

					onTarget = (Math.abs(nX - sX) < distance && 
								Math.abs(nY - sY) < distance) ? true : false,

					evt.preventDefault();

					return false;
				}, 

				endFn = function (evt) {
					evt = self.normalize(evt),
					(evt.target === target && onTarget) ? 
									endCb && endCb(evt) : 
									cancelCb && cancelCb(evt);

					document.body.removeEventListener(savvy.Platform.pointer_move, moveFn);
					document.body.removeEventListener(savvy.Platform.pointer_end, endFn);
					document.body.removeEventListener("touchcancel", endFn);

					savvy.Dom.removeClass(element, 'tapped');

					return false;
				};

			element = element.constructor === String ? document.getElementById(element) : element,
			element.addEventListener(savvy.Platform.pointer_start, startFn);

			return element;
		}

	});

})(this);