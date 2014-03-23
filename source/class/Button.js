(function (context) {

	core.Module("savvy.Button", {
		create: function (settings) {
			var parentNode = settings.parentNode || null;

			if (typeof(parentNode) === 'string') {
				parentNode = document.getElementById(parentNode);
			}

			var id = settings.id || null;
			var button = settings.element ? settings.element : 
				(id ? document.getElementById(id) : null);

			var className = settings.className ? settings.className : '';
			var innerText = settings.innerText ? settings.innerText : null;
			var innerHTML =  settings.innerHTML ? settings.innerHTML : null;

			if (!button) {
				button = new savvy.Dom.span({
					id: id,
					className: className,
					innerText: innerText,
					innerHTML: innerHTML,
					parentNode: parentNode
				});
			} else {
				id ? button.id = id : null;
				innerText ? button.innerText = innerText : null;
				innerHTML ? button.innerHTML = innerHTML : null;
				className ? savvy.Dom.addClass(button, className) : null;
			}

			savvy.Dom.addClass(button, 'savvy-button');

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