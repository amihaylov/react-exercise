'use strict';

var Dispatcher = require('../dispatcher/appDispatcher'),
	ActionTypes = require('../constants/actionTypes');
// Node events, using object assign so we can safely extend objects in ES6 and 5
var EventEmitter = require('events').EventEmitter,
	assign = require('object-assign'),
	_ = require('lodash');

// Const-like
var CHANGE_EVENT = 'change';

// Private
var _authors = [];

// Take empty obj, extend it to EventEmitter and return the new obj
var AuthorStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	getAllAuthors: function() {
		return _authors;
	},
	getAuthorById: function(id) {
		return _.find(_authors, {id: id});
	},
});

Dispatcher.register(function(action) {
	// Check authorActions.js and actionTypes.js for more info
	switch (action.actionType) {
	case ActionTypes.INITIALIZE:
		_authors = action.initialData.authors;
		AuthorStore.emitChange();
		break;
	case ActionTypes.CREATE_AUTHOR:
		_authors.push(action.author);
		// Emiting change to UI
		AuthorStore.emitChange();
		break;
	case ActionTypes.UPDATE_AUTHOR:
		var existingAuthor = _.find(_authors, {id: action.author.id}),
			existingAuthorIndex = _.indexOf(_authors, existingAuthor);
		_authors.splice(existingAuthorIndex, 1, action.author);
		// Emiting change to UI
		AuthorStore.emitChange();
		break;
	case ActionTypes.DELETE_AUTHOR:
		_.remove(_authors, function(author) {
			return action.id === author.id;
		});
		AuthorStore.emitChange();
		break;
	default:
		// Nothing to do
	}
});

module.exports = AuthorStore;
