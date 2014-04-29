(function (context) {

	core.Module('savvy.Network', {
		ajax: function (url, type, params, cb, error, timeout) {
			var xmlhttp;
			var queryString = '';
			var salt = '';

			if (window.XMLHttpRequest) {
				xmlhttp = new XMLHttpRequest();
			} else {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}

			xmlhttp.onerror = function () {
				error ? error(xmlhttp.responseText) : null;
				return;
			};

			xmlhttp.ontimeout = function () {
				timeout ? timeout(xmlhttp.responseText) : null;
				return;
			};

			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == 4 &&
					xmlhttp.status == 200) {
					cb ? cb(xmlhttp.responseText) : null;
				}
			};

			//Add Params
			if (params) {
				url.indexOf('?') !== -1 ? queryString += '&' : queryString += '?';
				queryString += "data=" + encodeURIComponent(JSON.stringify(params));
				url += queryString;
			}

			//Add Salt
			url.indexOf('?') !== -1 ? salt += '&salt=' : salt += '?salt=';
			salt += +new Date();
			url += salt;

			xmlhttp.open(type,url,true);
			xmlhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
			xmlhttp.timeout = 10000;
			xmlhttp.send();
		}
	});

})(this);