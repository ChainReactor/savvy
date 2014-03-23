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

		tap: function (element, startCb, endCb, cancelCb) {
			var self =		this,
				target =	null,

				sX =		0,
				sY =		0,
				nX =		0,
				nY =		0,

				distance = savvy.Platform.touch ? 60 : 30,
				onTarget = true;

				element.__tapStart = function (evt) {
					evt = self.normalize(evt),
					sX = evt.pointerX,
					sY = evt.pointerY;

					if (startCb) {
						startCb(evt);
						onTarget = true;
						target = evt.target;

						document.body.addEventListener(savvy.Platform.pointer_move, element.__tapMove);
						document.body.addEventListener(savvy.Platform.pointer_end, element.__tapEnd);
						document.body.addEventListener("touchcancel", element.__tapEnd);

						savvy.Dom.addClass(element, 'tapped');
					} 

					evt.preventDefault();
					return false;

				},

				element.__tapMove = function (evt) {
					evt = self.normalize(evt),

					nX = evt.pointerX,
					nY = evt.pointerY,

					onTarget = (Math.abs(nX - sX) < distance && 
								Math.abs(nY - sY) < distance) ? true : false,

					evt.preventDefault();
					return false;
				}, 

				element.__tapEnd = function (evt) {
					evt = self.normalize(evt),
					(evt.target === target && onTarget) ? 
									endCb && endCb(evt) : 
									cancelCb && cancelCb(evt);

					document.body.removeEventListener(savvy.Platform.pointer_move, element.__tapMove);
					document.body.removeEventListener(savvy.Platform.pointer_end, element.__tapEnd);
					document.body.removeEventListener("touchcancel", element.__tapEnd);

					savvy.Dom.removeClass(element, 'tapped');
					return false;
				};

			element = element.constructor === String ? document.getElementById(element) : element;

			element.removeEventListener(savvy.Platform.pointer_start, element.__tapStart);
			element.addEventListener(savvy.Platform.pointer_start, element.__tapStart);

			return element;
		}

	});

})(this);