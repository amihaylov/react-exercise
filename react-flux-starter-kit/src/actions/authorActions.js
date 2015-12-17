'use strict';

var Dispatcher = require('../dispatcher/appDispatcher'),
	AuthorApi = require('../api/authorApi'),
	ActionTypes = require('../constants/actionTypes');

var AuthorActions = {
	// Depending on the case we can merge create and update into save
	createAuthor: function(author) {
		var newAuthor = AuthorApi.saveAuthor(author);

		// Dispatcher informs stores that an author has been created.
		Dispatcher.dispatch({
			actionType: ActionTypes.CREATE_AUTHOR,
			author: newAuthor,
		});
	},
	updateAuthor: function(author) {
		var updatedAuthor = AuthorApi.saveAuthor(author);

		// Dispatcher informs stores that an author has been updated.
		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATE_AUTHOR,
			author: updatedAuthor,
		});
	},
	deleteAuthor: function(id) {
		AuthorApi.deleteAuthor(id);

		// Dispatcher informs stores that an author has been deleted.
		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_AUTHOR,
			id: id,
		});
	},
};

module.exports = AuthorActions;
