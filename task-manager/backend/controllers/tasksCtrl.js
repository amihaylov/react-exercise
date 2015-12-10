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

exports.create = function(req, res) {
	var task = {
		name: req.body.name,
		done: req.body.done,
		deadLine: req.body.deadLine
	};

	ListModel.findOne({name: convertParams(req.params.lname)}, function(err, list) {
		if (err) {
			res.status(500).send('Internal server error, could not open list! ', err);
		} else {
			list.tasks.push(task);
			list.save(function (err) {
				if (err) {
					console.error(err);
					res.status(500).send('Internal server error, could not create task! ', err);
				} else {
					res.status(200).send('Successfully added task.');
				}
			});
		}
	});
};

exports.update = function(req, res) {
	var task = {
		name: req.body.name,
		done: req.body.done
		//deadLine: req.body.deadLine
	},
		listName = convertParams(req.params.lname),
		taskName = convertParams(req.params.tname),

	// Using more Mongodb approach via $set directive and db.collection.update()
		set = {};
	for (var field in task) {
		if (task.hasOwnProperty(field)) {
			set['tasks.$.' + field] = task[field];
		}
	}

	ListModel.update({name: listName, "tasks.name": taskName}, 
		{$set: set}, 
		function(err, numAffected, rawResponse) {
			if (err) {
				console.error(err);
				res.status(500).send('Internal server error, could not update task! ', err);
		} else if (!numAffected.nModified) {
			console.log('Could not find list with that param! ', taskName);
			res.status(404).send('Could not find list with that param! ' + taskName + 
				'Or nothing to be updated.');
		} else {
			res.status(200).send('Updated successfully!');
		}
	});

};

exports.delete = function(req, res) {
	ListModel.findOne({name: convertParams(req.params.lname)}, function(err, list) {
		if (err) {
			res.status(500).send('Internal server error, could not open list! ', err);
		} else {

			// Get index of concrete task, via task name
			var taskIndex = _.findIndex(list.tasks, function(n) {
				return n.name === convertParams(req.params.tname);
			});

			list.tasks.splice(taskIndex, 1);
			list.save(function (err) {
				if (err) {
					console.error(err);
					res.status(500).send('Internal server error, could not delete task! ', err);
				} else {
					res.status(200).send('Successfully deleted task.');
				}
			});
		}
	});
};