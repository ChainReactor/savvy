(function () {
	var __data = {};
	var __key = null

	core.Module("savvy.Storage", 
		{
			create: function (key) {
				this.setKey(key);
				this.load();
			},

			setKey: function (key) {
				__key = 'savvy-storage'
			},

			get: function (id) {
				return id ? __data[id] : __data; 
			},

			set: function (id, data) {
				if (__data[id]) {
					var oldData = __data[id];

					if (data.toConfig) {
						data = data.toJSON();
					}

				}
				__data[id] = data;
			},

			clear: function () {
				var data, d;

				for (d in __data) {
					delete __data[d];
				}
			},

			load: function () {
				var data = localStorage.getItem(__key) || {};

				if (typeof(data) === 'string') {
					data = JSON.parse(data);
				}

				__data = data;
			},

			save: function () {
				if (typeof(__data) === 'object') {
					__data = JSON.stringify(__data);
				}

				localStorage.setItem(__key, __data);
			}
		}
	);
})();