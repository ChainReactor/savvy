(function () {

	var __transforms = {};

	core.Module("savvy.Effects", {
		getTransform: function (elem) {
			var transform = __transforms[elem];

			return transform || [0,0,1];
		},

		transform: (function(global) {
			var docStyle = document.documentElement.style;

			var engine;
			if (global.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
				engine = 'presto';
			} else if ('MozAppearance' in docStyle) {
				engine = 'gecko';
			} else if ('WebkitAppearance' in docStyle) {
				engine = 'webkit';
			} else if (typeof navigator.cpuClass === 'string') {
				engine = 'trident';
			}

			var vendorPrefix = {
				trident: 'ms',
				gecko: 'Moz',
				webkit: 'Webkit',
				presto: 'O'
			}[engine];

			var helperElem = document.createElement("div");
			var undef;

			var perspectiveProperty = vendorPrefix + "Perspective";
			var transformProperty = vendorPrefix + "Transform";

			var doSave = function (content, left, top, zoom) {
				__transforms[content] = [left, top, zoom];
			};

			if (helperElem.style[perspectiveProperty] !== undef) {

				return function (elem, left, top, zoom, save) {
					elem.style[transformProperty] = 'translate3d(' + (left) + 'px,' + (top) + 'px,0) scale(' + zoom + ')';

					save ? doSave(elem, left, top, zoom) : null;
				};

			} else if (helperElem.style[transformProperty] !== undef) {

				return function (elem, left, top, zoom, save) {
					elem.style[transformProperty] = 'translate(' + (left) + 'px,' + (top) + 'px) scale(' + zoom + ')';

					save ? doSave(elem, left, top, zoom) : null;
				};

			} else {

				return function (elem, left, top, zoom, save) {
					elem.style.marginLeft = left ? (-left/zoom) + 'px' : '';
					elem.style.marginTop = top ? (-top/zoom) + 'px' : '';
					elem.style.zoom = zoom || '';

					save ? doSave(elem, left, top, zoom) : null;
				};

			}
		})(window),

		transition: (function (global) {
			var prefix, 
				vendorPrefix = {
					transition: "transitionend",
					OTransition: "oTransitionEnd",
					MozTransition: "transitionend",
					WebkitTransition: "webkitTransitionEnd"
				}, 
				helperElem = document.createElement("div"),
				evt = null;

			for (prefix in vendorPrefix) {
				if (helperElem.style[prefix] !== 'undefined') {
					evt = vendorPrefix[prefix];
				}
			}

			if (evt && !savvy.Platform.badroid) {
				return function (elem, callback) {
					elem.removeEventListener(evt, elem.__transition);

					elem.__transition = function () {
						callback ? callback(elem) : null;
						elem.removeEventListener(evt, elem.__transition);
						elem.__transition = null;
					};

					elem.addEventListener(evt, elem.__transition)
				}
			} else {
				return function (elem, callback) {
					setTimeout(function () {
						callback ? callback(elem) : null
					}, 0)
				}
			}
		})(window),

		animation: (function () {
			var prefix,
				vendorPrefix = {
					transition: "animationend",
					OTransition: "oanimationend",
					MozTransition: "mozAnimationEnd",
					WebkitTransition: "webkitAnimationEnd"
				}, 
				helperElem = document.createElement("div"),
				evt = null;

			for (prefix in vendorPrefix) {
				if (helperElem.style[prefix] !== 'undefined') {
					evt = vendorPrefix[prefix];
				}
			}

			if (evt && !savvy.Platform.badroid) {
				return function (elem, callback) {
					elem.removeEventListener(evt, elem.__animation);
					elem.__animation = function () {
						callback ? callback(elem) : null;
						elem.removeEventListener(evt, elem.__animation);
						elem.__animation = null;
					};
					elem.addEventListener(evt, elem.__animation);
				}
			} else {
				return function (elem, callback) {
					setTimeout(function () {
						callback ? callback(elem) : null
					}, 0);
				}
			}

		})(window)
	});
})(this);