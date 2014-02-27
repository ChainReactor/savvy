core.Class("savvy.widget.WidgetView", {
	construct: function (settings) {
		savvy.widget.WidgetView.count += 1;

		settings = settings || {};
		settings.children = settings.children || {};

		this.__settings = savvy.Extend.recurse(this.defaults, settings, true);
		this.__settings.children = savvy.Extend.recurse(this.defaults.children, settings.children);

		this.__children = {};
		this.__model = {};
		this.__element = null;
		this.__created = false;
		this.__bound = false;
		this.__blocked = false;

		this.create();
	}, 
	members: {
		defaults: {
			id: "savvy-widget",
			className: "savvy-widget",
			parentNode: document.body,
			tag: 'div',

			children: {}
		},

		create: function () {
			if (this.__created) {
				return;
			}

			var element = this.__element;
			var settings = this.__settings;

			this.__element = this.createElement();

			if (!this.__element) {
				return;
			}

			element = this.__element;

			this.createChildren(settings.children);

			if (element) {
				if (!element.parentNode && settings.parentNode) {
					if (typeof(settings.parentNode) === "string") {
						settings.parentNode = document.getElementById(settings.parentNode);
					}

					settings.parentNode.appendChild(element);
				}
			}

			this.__created = true;
		},

		destroy: function () {
			if (!this.__created) {
				return;
			}

			if (this.__children) {
				this.destroyChildren();
			}

			if (this.__element) {
				this.destroyElement();
			}

			this.__created = false;
		},

		show: function () {
			this.checkCreate();

			if (this.__element) {
				savvy.Dom.addClass(this.__element, 'show');
			}
		},

		hide: function () {
			this.checkCreate();

			if (this.__element) {
				savvy.Dom.removeClass(this.__element, 'show');
			}
		},

		block: function () {
			this.checkCreate();

			if (this.isBlocked()) {
				return;
			}

			if (this.__element) {
				savvy.Dom.addClass(this.__element, 'block');
			}

			this.__blocked = true;
		},

		unblock: function () {
			this.checkCreate();

			if (!this.isBlocked()) {
				return;
			}

			if (this.__element) {
				savvy.Dom.removeClass(this.__element, 'block');
			}

			this.__blocked = false;
		},

		bind: function () {
			this.checkCreate();

			if (this.isBound()) {
				return;
			}

		},

		unbind: function () {
			this.checkCreate();

			if (!this.isBound()) {
				return;
			}
		},

		//Updates the Model for Rendering
		update: function (model) {
			this.__model = savvy.Extend.recurse(this.__model, model);
		},

		render: function () {
			this.checkCreate();
		},

		createElement: function () {
			var element = this.__element;
			var settings = this.__settings;

			if (!element) {
				if (settings.id) {
					element = document.getElementById(settings.id);
				}

				if (!element) {
					element = savvy.Dom[settings.tag]({
						id: settings.id,
						className: settings.className
					});
				}
			}

			return element;
		},

		getElement: function () {
			return this.__element;
		},

		destroyElement: function () {
			if (this.__element) {
				this.__element.parentNode ? 
					this.__element.parentNode.removeChild(this.__element) : 
					null;

				this.__element = null;
			}
		},

		createChild: function (id, className, child, parent) {
			parent = parent || this.__element;

			var element = null;
			var tag = null;
			var clsName;

			if (child) {

				element = child.appendChild ? child : null;

				if (!element) {
					tag = child.tag || 'div';

					//Mebbe refactor? Simple class addition check for children.
					clsName =	(className ? className : '') + 
								(className && child.className ? ' ' : '') + 
								(child.className || '');

					element = savvy.Dom[tag]({
						id: id,
						className: clsName, 
						parentNode: child.parentNode || parent
					});
				}

				if (child.children && !child.appendChild) {
					this.createChildren(child.children, element);
				}
			}

			this.__children[id] = element;

			return this.__children[id];
		},

		createChildren: function (children, parent) {
			var child, c;

			for (c in children) {
				child = children[c];
				this.createChild(child.id || c, c, child, parent);
			}
		},

		getChildren: function () {
			return this.__children;
		},

		getChild: function (id) {
			return this.__children[id];
		},

		destroyChild: function (id, child) {
			var child = this.__children[id];

			if (child) {
				child.parentNode ? child.parentNode.removeChild(child) : null;
			}

			this.__children[id] = null;
		},

		destroyChildren: function (children) {
			children = children || this.__children;

			var child, c;

			for (c in children) {
				child = children[c];
				this.destroyChild(c, child);
			}
		},



		//Privates (Kinda nasty things I shouldn't expose).
		//You can make your own.
		checkCreate: function () {
			if (!this.__created) {
				this.create();
			}
		},



		//Common (Not used for perf, expected outside the Widget).
		getModel: function () {
			return this.__model;
		},
		getElement: function () {
			return this.__element;
		},
		getSettings: function () {
			return this.__settings;
		},

		isBlocked: function () {
			return this.__blocked;
		},

		isCreated: function () {
			return this.__created;
		},

		isBound: function () {
			return this.__bound;
		}
	}
});

savvy.widget.WidgetView.count = 0;