core.Class("savvy.widget.Widget", {
	include: [savvy.common.Emitter],

	construct: function (settings) {
		savvy.common.Emitter.call(this)

		savvy.widget.Widget.count += 1;

		settings = settings || {};
		settings.view = settings.view || {};
		settings.widgets = settings.widgets || {};

		this.__settings = savvy.Extend.recurse(this.defaults, settings, true);
		this.__settings.view = savvy.Extend.recurse(this.defaults.view, settings.view);
		this.__settings.widgets = savvy.Extend.recurse(this.defaults.widgets, settings.widgets);

		this.__widgets = {};
		this.__resources = {};
		this.__handlers = {};
		this.__view = null;
		this.__created = false;
		this.__bound = false;
		this.__blocked = false;
	},

	members: {
		View: savvy.widget.WidgetView,

		defaults: {
			view: savvy.widget.WidgetView.prototype.defaults,
			widgets: {}
		},

		handlers: {
			//Common Widget Events from Evented Resources Added
			RESOURCE_UPDATED: function (e) { console.log('RESOURCE_UPDATED', e); },
			RESOURCE_LOADED: function (e) { console.log('RESOURCE_LOADED', e); },
			RESOURCE_TERMINATED: function (e) { console.log('RESOURCE_TERMINATED', e); }
		},

		//Widget / Common
		create: function () {

			console.info(this.constructor, 'create');

			if (this.__created) {
				this.destroy();
				return;
			}

			this.createView();
			this.createWidgets();

			this.__created = true;
		},

		destroy: function () {

			console.info(this.constructor, 'destroy');

			if (!this.__created) {
				return;
			}

			this.destroyWidgets();
			this.destroyView();

			this.__created = false;

		},

		update: function (model) {

			console.info(this.constructor, 'update');

			this.checkCreate();

			var view = this.__view || null;
				view && view.update ? view.update(model) : null;
		},

		render: function () {

			console.info(this.constructor, 'render');

			this.checkCreate();

			var view = this.__view || null;
				view && view.render ? view.render() : null;
		},

		resize: function () {
			this.checkCreate();

			console.info(this.constructor, 'resize');

			var view = this.__view || null;
				view && view.resize ? view.resize() : null;
		},

		show: function () {

			console.info(this.constructor, 'show');

			this.checkCreate();

			var view = this.__view || null;
				view && view.show ? view.show() : null;
		},

		hide: function () {

			console.info(this.constructor, 'hide');

			this.checkCreate();

			var view = this.__view || null;
				view && view.hide ? view.hide() : null;
		},

		block: function () {

			console.info(this.constructor, 'block');

			this.checkCreate();

			if (this.isBlocked()) {
				return;
			}

			var view = this.__view || null;
				view && view.block ? view.block() : null;

			this.__blocked = true;
		},

		unblock: function () {

			console.info(this.constructor, 'unblock');

			this.checkCreate();

			if (!this.isBlocked()) {
				return;
			}

			var view = this.__view || null;
				view && view.unblock ? view.unblock() : null;

			this.__blocked = false;
		},

		bind: function () {

			console.info(this.constructor, 'bind');

			this.checkCreate();

			if (this.isBound()) {
				return;
			}

			var view = this.__view || null;
				view && view.bind ? view.bind() : null;

			this.__bound = true;
		},

		unbind: function () {

			console.info(this.constructor, 'unbind');

			if (!this.isBound()) {
				return;
			}

			var view = this.__view || null;
				view && view.unbind ? view.unbind() : null;

			this.__bound = false;
		},



		//View
		createView: function () {

			console.info(this.constructor, 'createView');

			var settings = this.__settings.view;

			if (!this.__view) {
				this.__view = this.View ? new this.View(settings) : null;
			}
		},

		getView: function () {
			return this.__view;
		},

		destroyView: function () {

			console.info(this.constructor, 'destroyView');

			this.__view ? this.__view.destroy() : null;
			this.__view = null;
		},



		//Widget Extends
		createWidget: function (id, widget) {

			console.info(this.constructor, 'createWidget', id);

			widget = widget.displayName ? new widget() : widget;

			this.__widgets[id] = widget;
			widget.create();

			return widget;
		},

		createWidgets: function (widgets) {

			console.info(this.constructor, 'createWidgets');

			var settings = this.__settings.widgets;

			var widget, w;

			widgets = widgets || settings;

			for (w in widgets) {
				widget = widgets[w];

				this.createWidget(w, widget);
			}
		},

		destroyWidget: function (id, widget) {

			console.info(this.constructor, 'destroyWidget', id);

			var widgets = this.__widgets;

			widget = widget || widgets[id];

			if (widget && widget.isCreated()) {
				widget.destroy();
			}

			this.__widgets[id] = null;
		},

		destroyWidgets: function (widgets) {

			console.info(this.constructor, 'destroyWidgets');

			var widget, w;

			widgets = widgets || this.__widgets;

			for (w in widgets) {
				widget = widgets[w];
				this.destroyWidget(w);
			}
		},

		getWidgets: function () {
			return this.__widgets;
		},

		getWidget: function (id) {
			return this.__widgets[id];
		},



		//Resources
		attachResources: function (resources) {

			console.info(this.constructor, 'attachResources');

			var resource, r;

			resources = resources || {};

			for (r in resources) {
				resource = resources[r];
				this.attachResource(r, resource);
			}
		},

		attachResource: function (id, resource) {

			console.info(this.constructor, 'attachResource', id);

			this.__resources[id] = resource;

			this.bindResource(id, resource);

			this.update();
		},

		removeResources: function (resources) {

			console.info(this.constructor, 'removeResources');

			var resource, r;

			resources = resources || this.__resources;

			for (r in resources) {
				resource = resources[r];
				this.removeResource(r, resource);
			}
		},

		removeResource: function (id, resource) {

			console.info(this.constructor, 'removeResource', id);

			resource = resource || this.getResource(id);

			if (resource) {
				this.unbindResource(id, resource);
				this.__resources[id] = null;
			}
		},

		getResource: function (id) {

			console.info(this.constructor, 'getResource', id);

			return this.__resources[id] || null;
		},

		bindResource: function (id, resource, events) {

			console.info(this.constructor, 'bindResource', id);

			resource = resource || this.getResource(id);
			events = events || (resource.constructor ? core.Class.getEvents(resource.constructor) : null);

			var evt, e;
			var handlers = this.handlers, handler;

			for (e in events) {
				evt = events[e];
				handler = handlers[e];

				resource.addListener(evt, handler, this);
			}
		},

		unbindResource: function (id, resource, events) {

			console.info(this.constructor, 'unbindResource', id);

			resource = resource || this.getResource(id);
			events = resource.constructor ? core.Class.getEvents(resource.constructor): null;

			var evt, e;
			var handlers = this.handlers, handler;

			for (e in events) {
				evt = events[e];
				handler = handlers[e];

				resource.removeListener(e, handler, this);
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
		getSettings: function () {
			return this.__settings;
		},

		getElement: function () {
			var view = this.__view || null;

			return view && view.getElement ? view.getElement() : null;
		},

		isCreated: function () {
			return this.__created;
		},

		isBlocked: function () {
			return this.__blocked;
		},

		isBound: function () {
			return this.__bound;
		}

	}
});

savvy.widget.Widget.count = 0;