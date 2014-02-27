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
				diff < 60 && "just now" ||
				diff < 120 && "1 min" ||
				diff < 3600 && Math.floor( diff / 60 ) + " mins" ||
				diff < 7200 && "1 hour" ||
				diff < 86400 && Math.floor( diff / 3600 ) + " hours") ||

				day_diff == 1 && "Yesterday" ||
				day_diff < 7 && day_diff + " days" ||
				day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks" ||

				"forever";
		},

		convert: function (time) {
			var isoString = new Date(time).toISOString(),
				prettyDate = this.pretty(isoString);
			return prettyDate;
		}
	})
})(this);