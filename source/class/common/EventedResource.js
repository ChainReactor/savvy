core.Class("savvy.common.EventedResource", {
	include: [savvy.common.Resource, savvy.common.Emitter],
	events: {
		RESOURCE_UPDATED: "RESOURCE_UPDATED",
		RESOURCE_LOADED: "RESOURCE_LOADED",
		RESOURCE_TERMINATED: "RESOURCE_TERMINATED"
	},

	construct: function (model) {
		savvy.common.Resource.call(this, model), savvy.common.Emitter.call(this);
	},
	members: {
		set: function (key, value) {
			var events = core.Class.getEvents(savvy.common.EventedResource),
				oldValue = this.get(key),
				changed = savvy.common.Resource.prototype.set.call(this, key, value);

			if (!value && value === changed) {
				changed = true;
			}

			return changed && this.emit(events.RESOURCE_UPDATED, this.__createPropertyChangeEvent(key, oldValue, value)), changed;
		},

		bulkSet: function (model) {
			var events = core.Class.getEvents(savvy.common.EventedResource),
				changed = savvy.common.Resource.prototype.bulkSet.call(this, model);

			return changed && this.emit(events.RESOURCE_UPDATED, this.__createPropertyChangeEvent(null, null, null)), changed;
		
		},

		setLoaded: function () {
			var events = core.Class.getEvents(savvy.common.EventedResource),
				loaded = savvy.common.Resource.prototype.setLoaded.call(this);
			loaded && this.emit(events.RESOURCE_LOADED, this.__createDataLoadEvent())
		},

		terminate: function () {
			var events = core.Class.getEvents(savvy.common.EventedResource);
			this.emit(events.RESOURCE_TERMINATED, this.__createTerminatedEvent()), this.clearListeners()
		},

		__createDataLoadEvent: function () {
			var events = core.Class.getEvents(savvy.common.EventedResource);

			return {
				type: events.RESOURCE_LOADED,
				timestamp: +new Date,
				resource: this
			};
		},

		__createTerminatedEvent: function () {
			var events = core.Class.getEvents(savvy.common.EventedResource);

			return {
				type: events.RESOURCE_TERMINATED,
				timestamp: +new Date,
				resource: this
			};
		},

		__createPropertyChangeEvent: function (key, oldVal, newVal) {
			var events = core.Class.getEvents(savvy.common.EventedResource);

			return {
				type: events.RESOURCE_UPDATED,
				timestamp: +new Date,
				propName: key,
				oldVal: oldVal,
				newVal: newVal,
				resource: this
			};

		}
	}
});

savvy.common.EventedResource.fromJSON = function (model) {
	return savvy.common.Resource.fromJSON.call(this, model);
}