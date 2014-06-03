(function (context) {
	var __notifications = {};
	var __listeners = {};
	var __count = 0;

	core.Module("savvy.Notification", {
		create: function (settings) {
			var self = this;

			var id = settings.id || 'notication_' + __count;
			var cb = null;

			var parent = settings.parentNode ? settings.parentNode : document.body;

			var notification = savvy.Dom.div({
				id: id,
				className: 'savvy-notification ' + (settings.className ? settings.className : '')
			});

			var content = null;
			if (settings.content) {
				if (typeof(settings.content) === "string") {
					content = savvy.Dom.div({
						innerHTML: settings.content, 
						className: 'savvy-notification_content', 
						parentNode: notification
					});
				} else if (settings.content.appendChild) {
					content = settings.content;
					notification.appendChild(content);
				}
			}

			if (settings.callback) {
				cb = settings.callback;
			}

			if (settings.touchDestroys) {
				__listeners[id] = function () {
					self.destroy(id, cb);
				};

				document.body.addEventListener(savvy.Platform.pointer_end, __listeners[id]);
			}

			parent ? parent.appendChild(notification) : null;

			setTimeout(function () {
				savvy.Dom.addClass(notification, 'show');
			}, 0);

			__notifications[id] = notification;

			if (settings.timeout) {
				setTimeout(function () {
					self.destroy(id, cb);
				}, settings.timeout);
			}

			__count ++;
		},

		get: function (id) {
			return __notifications[id] || __notifications;
		},

		destroy: function (id, cb) {
			var notification = __notifications[id];
			var listener = __listeners[id];

			if (!notification) {
				cb ? cb() : null;
				return;
			}

			if (listener) {
				document.body.removeEventListener(savvy.Platform.pointer_end, __listeners[id]);
				delete __listeners[id];
			}

			savvy.Effects.transition(notification, function () {
				notification.parentNode ? notification.parentNode.removeChild(notification) : null;
				cb ? cb() : null;
			});

			setTimeout(function () {
				savvy.Dom.addClass(notification, 'hiding');
				savvy.Dom.removeClass(notification, 'show');
			}, 0);

			__notifications[id] = null;
		}
	});
})(this);