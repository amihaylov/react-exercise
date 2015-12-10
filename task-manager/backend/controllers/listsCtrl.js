var ListModel = require('../models/listsModel');
var _ = require('lodash');

// Util function to check for %20 in params
// and convert back to empty spaces
var convertParams = function(str) {
	if (_.contains(str,'%20')) {
		return str.split('%20').join(' ');
	}
	return str;
};

exports.getAll = function(req, res) {
	var query = ListModel.find().exec(function(err, results) {
		if (err) {
			console.error(err);
			res.status(500).send('Internal server error, could not getAll! ', err);
		} else {
			res.jsonp(results);
		}
	});
};

exports.create = function(req, res) {
	var entry = new ListModel({
		name: req.body.name
	});

	entry.save(function (err) {
		if (err) {
			console.error(err);
			res.status(500).send('Internal server error, could not create! ', err);
		} else {
			res.status(200).send('Successfully added list.');
		}
	});
};

exports.update = function(req, res) {
	var name = convertParams(req.params.lname),
	// Updating by param, matching name
		condition = {
			name: name
		},

		update = {
			name: req.body.name
		};
	
	ListModel.update(condition, update, function(err, numberAffected, rawResponse) {
		if (err) {
			console.error(err);
			res.status(500).send('Internal server error, could not update! ', err);
		} else if (!numberAffected.nModified) {
			console.log('Could not find list with that param! ', name);
			res.status(404).send('Could not find list with that param! ' + name +
				'Or nothing to be updated.');
		} else {
			res.status(200).send('Updated successfully!');
		}
	});
};

exports.delete = function(req, res) {
	var name = convertParams(req.params.lname),
	// Updating by param, matching name
		condition = {
		name: name
	};

	ListModel.remove(condition, function(err, removed) {
		if (err) {
			console.error(err);
			res.status(500).send('Internal server error, could not delete! ', err);
		} else if(!removed.result.n) {
			console.log('Could not find list with that param! ', name);
			res.status(404).send('Could not find list with that param! ' + name);
		} else {
			res.status(200).send('Removed successfully!');
		}
	});
};