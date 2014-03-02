core.Class("savvy.widget.EventedWidget", {
	include: [savvy.common.Emitter, savvy.widget.Widget],

	construct: function (settings) {
		savvy.common.Emitter.call(this, settings);
		savvy.widget.Widget.call(this, settings);
	}
});