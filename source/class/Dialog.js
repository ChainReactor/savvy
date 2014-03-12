(function (context) {

	var __dialogs = {};
	var __count = 0;

	core.Module("savvy.Dialog", {
		create: function (settings) {
			var self = this;

			var id = settings.id || 'dialog_' + __count;

			var parent = settings.parentNode ? settings.parentNode : document.body;

			var overlay = savvy.Dom.div({
				id: id,
				className: 'savvy-overlay '
			});

			if (overlay && settings.overlay) {
				if (typeof(settings.overlay) === "boolean") {
					savvy.Dom.addClass(overlay, "fade")
				}

				if (typeof(settings.overlay) === "string") {
					savvy.Dom.addClass(overlay, settings.overlay);
				}
			}

			var dialog = savvy.Dom.div({
				className: 'savvy-dialog ' + (settings.className ? settings.className : ''),
				parentNode: overlay
			});

			var title = null;
			if (settings.title) {
				if (typeof(settings.title) === "string") {
					title = savvy.Dom.div({
						innerHTML: settings.title, 
						className: 'savvy-dialog_title', 
						parentNode: dialog
					});
				} else if (settings.title.appendChild) {
					title = settings.title;
					dialog.appendChild(title);
				}
			}

			var content = null;
			if (settings.content) {
				if (typeof(settings.content) === "string") {
					content = savvy.Dom.div({
						innerHTML: settings.content, 
						className: 'savvy-dialog_content', 
						parentNode: dialog
					});
				} else if (settings.content.appendChild) {
					content = settings.content;
					dialog.appendChild(content);
				}
			}

			var close = null;
			if (settings.close) {
				close = savvy.Button.create({
					className: 'close',
					parentNode: dialog,
					callback: function () {
						self.destroy(id);
					}
				});
			}

			var buttons = null, button, b;
			var makeUniqueButton = function (data) {
				var cb = null;
				if (data.callback) {
					cb = data.callback;
				}

				data.callback = function () {
					self.destroy(id, function () {
						cb ? cb() : null;
					});
				};

				savvy.Button.create(data);
			};

			var makeCustomButton = function (data) {
				var cb = null;

				if (data.callback) {
					cb = data.callback;
				}

				data.callback = function () {
					if (data.destroy) {
						self.destroy(id, function () {
							cb ? cb() : null;
						});
					} else {
						cb ? cb() : null;
					}
					
				};

				savvy.Button.create(data);
			};

			var buttonContainer = null;
			if (settings.buttons) {
				buttonContainer = savvy.Dom.div({className: 'savvy-dialog_buttons', parentNode: dialog});
				buttons = settings.buttons;

				for (b in buttons) {

					button = buttons[b];
					button.parentNode = buttonContainer;

					if (b === 'cancel' ||
						b === 'confirm') {
						makeUniqueButton(button);
						continue;
					}

					makeCustomButton(button);
				}
			}

			parent ? parent.appendChild(overlay) : null;

			setTimeout(function () {
				savvy.Dom.addClass(overlay, 'show');
			}, 0);

			__dialogs[id] = overlay;

			__count ++;
		},

		get: function (id) {
			return __dialogs[id];
		},

		destroy: function (id, cb) {
			var overlay = __dialogs[id];

			if (!overlay) {
				return;
			}

			savvy.Effects.transistion(overlay, function () {
				overlay.parentNode ? overlay.parentNode.removeChild(overlay) : null;
				cb ? cb() : null;
			});

			setTimeout(function () {
				savvy.Dom.removeClass(overlay, 'show');
			}, 0);

			__dialogs[id] = null;
		}
	});
})(this);

/*

savvy.Dialog.create({
	close: true, 
	overlay: true, 
	title: 'This is a Dialog Example!', 
	content: 'You can put <b>HTML</b> tags into it and whatever!', 
	buttons: { 
		cancel: { 
			innerText: 'Cancel', 
			className: 'cancel', 
			callback: function () { alert('Cancel'); }
		}, 
		confirm: { 
			innerHTML: '<b>Confirm</b>', 
			className: 'confirm', 
			callback: function () { alert('Confirm'); }
		}, 
		custom: { 
			innerText: 'Custom', 
			className: 'default', 
			callback: function () { alert('Custom'); } 
		}    
	}
});

*/
