core.Class("savvy.page.PageView", {
	include: [savvy.widget.WidgetView],

	construct: function (settings) {
		this.__topbar = null;
		this.__content = null;

		savvy.widget.WidgetView.call(this, settings);
	},

	members: {
		defaults: {
			id: "savvy-page",
			className: "savvy-page",
			parentNode: null,
			tag: 'div'
		},

		create: function () {
			savvy.widget.WidgetView.prototype.create.call(this);

			if (!this.__topbar) {
				this.__topbar = this.__element.getElementsByClassName("savvy-topbar")[0];
			}

			if (!this.__content) {
				this.__content = this.__element.getElementsByClassName("savvy-content")[0];
			}

			if (!this.__bottombar) {
				this.__bottombar = this.__element.getElementsByClassName("savvy-bottombar")[0];
			}
		},

		resize: function () {
			savvy.widget.WidgetView.prototype.resize.call(this);

		},

		getTopbar: function () {
			return this.__topbar;
		},

		getContent: function () {
			return this.__content;
		},

		getBottomBar: function () {
			return this.__bottombar;
		}
	}
});