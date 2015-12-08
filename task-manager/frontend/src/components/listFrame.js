'use strict';
var React = require('react'),
	Button = require('react-bootstrap').Button,
	List = require('./list'),
	Popup = require('./popup');

var ListFrame = React.createClass({
	getInitialState: function() {
		return { showModal: false };
	},
	close: function() {
		this.setState({ showModal: false });
	},
	open: function() {
		this.setState({ showModal: true });
	},
	render: function() {
		var self = this;
		var listNodes = this.props.data.map(function(list, index) {
			return (
				// `key` is a React-specific concept and is not mandatory for the
				// purpose of this tutorial. if you're curious, see more here:
				// http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
				<List name={list.name} key={index}
					tasks={list.tasks} url={self.props.url}/>
			);
		});
		return (
			<div className="container">
				{listNodes}
				<Button bsStyle="info">
					<i className="fa fa-plus"></i><span>Add TODO List</span>
				</Button>
				<Popup showModal={this.state.showModal} close={this.close} name=""/>
			</div>
		);
	},
});

module.exports = ListFrame;
