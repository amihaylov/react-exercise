'use strict';
var $ = require('jquery');

var AjaxAPI = {
	getData: function(url) {
		return $.get(url);
	},
	postData: function(url, data) {
		return $.ajax({
			url: url,
			dataType: 'json',
			type: 'POST',
			data: data,
		});
	},
	putData: function(url, data) {
		return $.ajax({
			url: url,
			dataType: 'json',
			type: 'PUT',
			crossDomain: true,
			//contentType: 'application/plain',
			data: data,
		});
	},
	deleteData: function(url) {
		return $.ajax({
			url: url,
			crossDomain: true,
			//contentType: 'text/plain',
			type: 'DELETE',
		});
	},
};
module.exports = AjaxAPI;
