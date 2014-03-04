(function (context) {
	core.Module("savvy.Time", {
		//Thanks resig
		pretty: function (time) {
			var date = new Date(time || "");//.replace(/-/g,"/").replace(/[TZ]/g," ")),
			var diff = (((new Date()).getTime() - date.getTime()) / 1000);
			var day_diff = Math.floor(diff / 86400);

			if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
				return;
					
			return day_diff == 0 && (
				diff < 60 && "now" ||
				diff < 120 && "1m" ||
				diff < 3600 && Math.floor( diff / 60 ) + "m" ||
				diff < 7200 && "1h" ||
				diff < 86400 && Math.floor( diff / 3600 ) + "h") ||

				day_diff == 1 && "1d" ||
				day_diff < 7 && day_diff + "d" ||
				day_diff < 31 && Math.ceil( day_diff / 7 ) + "w" ||

				"forever";
		},

		convert: function (time) {
			var isoString = new Date(time).toISOString(),
				prettyDate = this.pretty(isoString);
			return prettyDate;
		}
	})
})(this);