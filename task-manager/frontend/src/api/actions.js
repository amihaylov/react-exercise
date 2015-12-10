'use strict';

var AjaxAPI = require('../api/ajax');

// Util method to check if url string has spaces
var convertUrl = function(url) {
	if (url.contains(' ')) {
		var replaceStr = '%20';
		return url.split(' ').join(replaceStr);
	}
	return url;
};

// Different action strategies
var Actions = {
	// If extending later, might consider using convertUrl here as well,
	// if we load partial data by params
	loadDataFromServer: function(url, callBack) {
		AjaxAPI.getData(url).then(function(data) {
			if (callBack) {
				callBack(data);
			}
		},function(err) {
			console.log(err);
		});
	},
	addItem: function(url, data, callBack) {
		AjaxAPI.postData(convertUrl(url), data).then(function() {
			if (callBack) {
				callBack(data);
			}
		}
		,function(err) {
			console.log(err);
		});
	},
	editItem: function(url, data, callBack) {
		AjaxAPI.putData(convertUrl(url), data).then(function() {
			if (callBack) {
				callBack(data);
			}
		}
		,function(err) {
			console.log(err);
		});
	},
	deleteItem: function(url, callBack) {
		AjaxAPI.deleteData(convertUrl(url)).then(function(data) {
			if (callBack) {
				callBack(data);
			}
		},function(err) {
			console.log(err);
		});
	},
};

module.exports = Actions;
