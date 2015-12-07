'use strict';
var React = require('react'),
	Button = require('react-bootstrap').Button,
	List = require('./list');

var ListFrame = React.createClass({
	render: function() {
		var listNodes = this.props.data.map(function(list, index) {
			return (
				// `key` is a React-specific concept and is not mandatory for the
				// purpose of this tutorial. if you're curious, see more here:
				// http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
				<List name={list.name} key={index} tasks={list.tasks}>
				</List>
			);
		});
		return (
			<div className="container">
				{listNodes}
				<Button bsStyle="info">
					<i className="fa fa-plus"></i><span>Add TODO List</span>
				</Button>
			</div>
		);
	}
});

module.exports = ListFrame;