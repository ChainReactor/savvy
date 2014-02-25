(function (context) {

	var emitter = new savvy.common.Emitter;
	core.Module("savvy.EventBus", {

		addListener: function () {
			emitter.addListener.apply(emitter, arguments);
		},

		removeListener: function () {
			emitter.removeListener.apply(emitter, arguments);
		},

		clearListeners: function () {
			emitter.clearListeners.apply(emitter, arguments);
		},

		getListeners: function () {
			return emitter.getListeners.apply(emitter, arguments);
		},

		once: function () {
			emitter.once.apply(emitter, arguments);
		},

		emit: function () {
			emitter.emit.apply(emitter, arguments);
		}
	});

})(this);