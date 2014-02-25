core.Class("savvy.common.Resource", {
	construct: function (model) {
		savvy.common.Resource.count += 1;

		model = model || {};

		this.__created = false;
		this.__loaded = false;
		this.__type = model.type || "generic";
		this.__data = {};

		if (model.data) {
			this.create(model.data);
		}
	},
	members: {
		create: function (data) {
			var self = this,
				property = null,
				newData = null,
				e = null,

				returns = null;

			if (this.isCreated()) {
				return;
			}

			//Refactor
			returns = data && typeof(data) === "object" ? (
				newData = {}, 
				e = Object.keys(data), 

				e.length < 1 ? false : (
					e.forEach(function (property) {
						var e = self.mapProperty(property, data[property]);
						e ? newData[e.name] = e.value : "id" === property && (newData[property] = data[property])
					}), 
					newData.id || (newData.id = this.__type + savvy.common.Resource.count), 
					this.__data = newData, 
					this.__created = true
					)
			) : false;

			return returns;
		},

		destroy: function () {},

		get: function (key) {
			return this.__data[key];
		},

		set: function (key, value) {
			var oldValue,
				newValue,
				oldModel,
				newModel = this.mapProperty(key, value);

			if (newModel) {
				value = newModel.value;
				oldModel = this.__data[newModel.name];

				if ("object" == typeof newModel.value) {
					oldValue = JSON.stringify(oldModel);
					newValue = JSON.stringify(value);

					if (oldValue === newValue) return;
				}
				else if (oldModel === value || typeof (value) === "undefined") {
					return;
				}

				return this.__data[newModel.name] = value;
			}

			return;
		},

		bulkSet: function (data) {
			var key, value;
			var changed = false;

			for (key in data) {
				value = data[key];
				if (this.set(key, value)) {
					changed = true;
				}
			}

			return changed;
		},

		mapProperty: function (key, value) {
			return {
				name: key,
				value: value
			};

			return false;
		},

		getType: function () {
			return this.__type;
		},

		isCreated: function () {
			return this.__created;
		},

		isLoaded: function () {
			return this.__loaded;
		},

		setLoaded: function () {
			this.__loaded ? false : this.__loaded = true;
			return this.__loaded;
		},

		toConfig: function () {
			return {
				className: this.constructor.displayName,
				type: this.__type,
				data: this.__data
			}
		},

		toJSON: function () {
			return JSON.stringify(this.toConfig())
		}
	}
});

savvy.common.Resource.count = 0;
savvy.common.Resource.fromJSON = function (data) {
	var resource = null,
		model = null;

	if (typeof(data) === "string") {
		model = JSON.parse(data);
		resource = new this(model);
	}

	return resource;
};