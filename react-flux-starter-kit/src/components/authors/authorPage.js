"use strict";

var React = require('react'),
	Router = require('react-router'),
	Link = Router.Link;
var AuthorStore = require('../../stores/authorStore'),
	AuthorActions = require('../../actions/authorActions'),
	AuthorList = require('./AuthorList');

var AuthorPage = React.createClass({
	getInitialState: function() {
		return {
			authors: AuthorStore.getAllAuthors(),
		};
	},
	componentWillMount: function() {
		AuthorStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		AuthorStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState({ authors: AuthorStore.getAllAuthors() });
	},
	render: function() {
		return (
			<div>
				<h1>Authors</h1>
				<Link to='addAuthor' className='btn btn-default'>Add Author</Link>
				<AuthorList authors={this.state.authors}/>
			</div>
			);
	},
});

module.exports = AuthorPage;
