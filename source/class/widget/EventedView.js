core.Class("savvy.widget.EventedWidgetView", {
	include: [savvy.common.Emitter, savvy.widget.WidgetView],

	construct: function (settings) {
		savvy.common.Emitter.call(this, settings);
		savvy.widget.WidgetView.call(this, settings);
	}
});
