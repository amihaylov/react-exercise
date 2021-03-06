'use strict';

var React = require('react'),
	Router = require('react-router');
var AuthorForm = require('./authorForm'),
	AuthorActions = require('../../actions/authorActions'),
	AuthorStore = require('../../stores/authorStore'),
	toastr = require('toastr');

var ManageAuthorPage = React.createClass({
	mixins: [
		Router.Navigation,
	],
	statics: {
		willTransitionFrom: function(transition, component) {
			if (component.state.dirty && !confirm('Leave without saving?')) {
				transition.abort();
			}
		},
	},
	getInitialState: function() {
		return {
			author: {id: '', firstName: '', lastName: ''},
			errors: {},
			dirty: false,
		};
	},
	// Not with componentDidMount to avoid double rendering
	componentWillMount: function() {
		var authorId = this.props.params.id; //From the path '/author:id'

		if (authorId) {
			this.setState({author: AuthorStore.getAuthorById(authorId)});
		}
	},
	// Updated on every event like key press or click!
	setAuthorState: function(event) {
		this.setState({dirty: true});
		var field = event.target.name,
			value = event.target.value;
		this.state.author[field] = value;
		return this.setState({author: this.state.author});
	},
	authorFormIsValid: function() {
		var formIsValid = true;
		this.state.errors = {}; //clear any previous errors

		if (this.state.author.firstName.length < 3) {
			this.state.errors.firstName = 'First name must be at least 3 characters.';
			formIsValid = false;
		}

		if (this.state.author.lastName.length < 3) {
			this.state.errors.lastName = 'Last name must be at least 3 characters.';
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	},
	saveAuthor: function(event) {
		event.preventDefault();
		if (!this.authorFormIsValid()) {
			return;
		}
		// Trigger either update (if there is id) or create author
		if (this.state.author.id) {
			AuthorActions.updateAuthor(this.state.author);
		} else {
			AuthorActions.createAuthor(this.state.author);
		}
		this.setState({dirty: false});
		toastr.success('Author saved.');
		this.transitionTo('authors');
	},
	render: function() {
		return (
			<AuthorForm
			author={this.state.author}
			onChange={this.setAuthorState}
			onSave={this.saveAuthor}
			errors={this.state.errors}/>
		);
	},
});

module.exports = ManageAuthorPage;
