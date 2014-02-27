(function (context) {

	core.Module("savvy.Button", {
		create: function (settings) {
			var parentNode = settings.parentNode || null;

			if (typeof(parentNode) === 'string') {
				parentNode = document.getElementById(parentNode);
			}

			var button = new savvy.Dom.span({
				id: settings.id || null,
				className: 'savvy-button ' + (settings.className ? settings.className : ''),
				innerText: settings.innerText ? settings.innerText : null,
				innerHTML: settings.innerHTML ? settings.innerHTML : null,
				parentNode: parentNode
			});

			var callback = settings.callback;

			savvy.Pointer.tap(button, 
				function (e) {

				},
				function (e) {
					callback ? callback(e) : null;
				},
				function (e) {

				});

			return button;
		}
	});

})(this);