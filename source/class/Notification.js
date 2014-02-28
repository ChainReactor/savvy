(function (context) {
	var __notifications = {};
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
			return __notifications[id];
		},

		destroy: function (id, cb) {
			var notification = __notifications[id];

			if (!notification) {
				return;
			}

			savvy.Effects.transistion(notification, function () {
				notification.parentNode ? notification.parentNode.removeChild(notification) : null;
				cb ? cb() : null;
			});

			setTimeout(function () {
				savvy.Dom.removeClass(notification, 'show');
			}, 0);

			__notifications[id] = null;
		}
	});
})(this);