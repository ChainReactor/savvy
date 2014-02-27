(function () {

	var __dialogs = {};

	core.Module("savvy.Dialog", {
		create: function (settings) {
			var self = this;

			var id = 'dialog_' + Date.now();

			var parent = settings.parentNode ? settings.parentNode : document.body;

			var overlay = savvy.Dom.div({
				id: id,
				className: 'savvy-overlay ' + (settings.overlay ? 'fade' : '')
			});

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
					cb ? cb() : null;

					self.destroy(id);
				};

				savvy.Button.create(data);
			};
			var makeCustomButton = function (data) {
				savvy.Button.create(data);
			};
			var buttonContainer = null;
			if (settings.buttons) {
				buttonContainer = savvy.Dom.div({className: 'savvy-dialog_buttons', parentNode: dialog});
				buttons = settings.buttons;

				for (b in buttons) {

					button = buttons[b];
					button.parentNode = button.parentNode || buttonContainer;

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

		},
		destroy: function (id) {
			var overlay = __dialogs[id];

			if (!overlay) {
				return;
			}


			savvy.Effects.transistion(overlay, function () {
				overlay.parentNode ? overlay.parentNode.removeChild(overlay) : null;
				__dialogs[id] = null;
			});

			savvy.Dom.removeClass(overlay, 'show');
		}
	});
})();

/*
savvy.Dialog.create({overlay: true, title: 'This is a Dialog Example!', content: 'You can put <b>HTML</b> tags into it and whatever!', buttons: { cancel: { innerText: 'Cancel', className: 'cancel'}, custom: { innerText: 'Custom', className: 'default', callback: function () { alert('Custom'); } }    }});
*/
