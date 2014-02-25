(function (context) {

	core.Module('savvy.Extend', {
		simple: function (source, destination) {
			var property = null;

			for (property in source) {
				destination[property] = destination[property] || source[property];
			}

			return destination;
		},

		deep: function (source, destination) {
			var property = null;

			for (property in source) {
				if (source[property] && 
					source[property].constructor &&
					source[property].constructor === Object) {
					destination[property] = destination[property] || {};
					arguments.callee(destination[property], source[property]);
				} else {
					destination[property] = destination[property] || source[property];
				}
			}

			return destination;
		},

		recurse: function () {
			var returns = {};
			var sources = sources, source, s;
			var lastArg = arguments[arguments.length - 1];
			var recurse = (typeof(lastArg) === "boolean") ? lastArg : false;
			var method = null;

			sources = arguments;

			for (s = 0; s < sources.length - (recurse ? 1 : 0); s++) {
				source = sources[s];

				if (source) {
					method = (recurse && source.constructor) ? 'deep' : 'simple';
					returns = this[method] ? this[method](returns, source) : null;
				}
			}

			return returns;
		}
	});

})(this);