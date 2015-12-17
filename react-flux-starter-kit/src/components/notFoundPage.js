'use strict';

var React = require('react'),
	Link = require('react-router').Link;

var NotFoundPage = React.createClass({
	// Routing with the help of routes.js and Router.Link
	render: function() {
		return (
				<div >
					<h1>Page Not Found</h1>
					<p>Whoops! Sorry, there is nothing to see here.</p>
					<p>
						<Link to='app' className='navbar-brand'>
							Back to Home
						</Link>
					</p>
				</div>
		);
	},
});

module.exports = NotFoundPage;
