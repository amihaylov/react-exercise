"use strict";

var React = require('react');

var About = React.createClass({
	statics: {
		// Useful for pages that require logins
		willTransitionTo: function(transition, params, query, callBack) {
			if (!confirm('Are you sure you want to read about?')) {
				// Aborting redirection
				transition.about();
			} else {
				// Transitioning via callback
				callBack();
			}
		},
		// Useful for pages that save data not to loose it when redirecting
		willTransitionFrom: function(transition, component) {
			if (!confirm('Are you sure you want to leave a page?')) {
				// Aborting redirection
				transition.about();
			}
		},
	},
	render: function() {
		return (
			<div>
				<h1>About</h1>
				<p>
					This application uses the following technologies:
					<ul>
						<li>React</li>
						<li>React Router</li>
						<li>Flux</li>
						<li>Gulp</li>
						<li>Browserify</li>
					</ul>
				</p>
			</div>
		);
	},
});

module.exports = About;
