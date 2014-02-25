core.Class("savvy.common.Emitter", {
	construct: function () {
		this.__listeners = {}, 
		this.__currentList = [], 
		this.__locked = {};
	},
	members: {
		addListener: function (eventId, handler, scope, once) {
			var listeners = [];
			var list = null;

			scope = scope || null;
			"boolean" != typeof once && (once = false);
			"undefined" == typeof this.__listeners[eventId] && (this.__listeners[eventId] = []); 

			listeners[0] = handler;
			listeners[1] = scope;
			listeners[2] = once;

			(this.__locked[eventId] ? this.__currentList : this.__listeners[eventId]).push(listeners);
		},

		removeListener: function (eventId, handler, scope, once) {
			var listeners = this.__listeners[eventId],
				listener = null,
				index = 0,
				l = 0;

			if (scope = scope || null, listeners) {
				for ("boolean" !== typeof once && (once = false), 
					l = listeners.length; l > index; index += 1) {
					listener = listeners[index];

					if (listener[0] === handler && 
						listener[1] === scope && 
						listener[2] === once) {

						listener[2] = true; 
						this.__locked[eventId] || listeners.splice(index, 1);

						break;
					}
				}
			}
		},

		clearListeners: function () {
			this.__listeners = {}
		},

		getListeners: function (eventId) {
			var listeners = this.__listeners[eventId],
				returns = [];

			if (listeners && listeners.length > 0) {
				returns = listeners.slice(0)
			};

			return returns;
		},

		once: function (eventId, handler, scope) {
			this.addListener(eventId, handler, scope, true);
		},

		emit: function (eventId, arg1, arg2, arg3, arg4, arg5) {
			var listeners = this.__listeners[eventId],
				listener = null,
				list = null,
				index = 0,
				l = 0;

			if (listeners) {
				list = this.__currentList = [];
				this.__locked[eventId] = eventId;

				for (l = listeners.length; l > index; index += 1) {
					listener = listeners[index];
					listener[1] ? listener[0].call(listener[1], arg1, arg2, arg3, arg4, arg5) : listener[0](arg1, arg2, arg3, arg4, arg5);
					listener[2] || list.push(listener);
				}

				this.__listeners[eventId] = list;
				this.__locked[eventId] = false;
			}
		}
	}
});