core.Class("savvy.page.Page", {
	include: [savvy.widget.Widget],

	construct: function (settings) {
		savvy.widget.Widget.call(this, settings);
	},
	members: {
		View: savvy.page.PageView,

		defaults: {
			view: savvy.page.PageView.prototype.defaults
		},

		handlers: {
			//Common Widget Events from Evented Resources Added
			RESOURCE_UPDATED: function (e) { console.log('RESOURCE_UPDATED', e); },
			RESOURCE_LOADED: function (e) { console.log('RESOURCE_LOADED', e); },
			RESOURCE_TERMINATED: function (e) { console.log('RESOURCE_TERMINATED', e); }
		},

		create: function () {
			savvy.widget.Widget.prototype.create.call(this);
		},

		getTopbar: function () {
			this.checkCreate();

			var view = this.getView() || null;
			return view && view.getTopbar ? view.getTopbar() : null;
		},

		getContent: function () {
			this.checkCreate();

			var view = this.getView() || null;
			return view && view.getContent ? view.getContent() : null;
		},

		getBottomBar: function () {
			this.checkCreate();

			var view = this.getView() || null;
			return view && view.getBottomBar ? view.getBottomBar() : null;
		}
	}
});