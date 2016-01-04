'use strict';
var React = require('react'),
	Button = require('react-bootstrap').Button,
	List = require('./list'),
	Popup = require('./popup'),
	Actions = require('../api/actions');

var ListFrame = React.createClass({
	getInitialState: function() {
		return { showModal: false };
	},
	close: function() {
		this.setState({ showModal: false });
	},
	// Setting concrete strategy, see actions.js
	openAddList: function() {
		this.setState({ showModal: true, method: 'addItem' });
	},
	// Strategy handler
	handlePopup: function(item) {
		if (Actions[this.state.method]) {
			Actions[this.state.method](this.props.url, item);
		} else {
			console.log('Strategy ' + this.state.method + ' not yet implemented!');
		}
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
				<Button bsStyle="info" onClick={this.openAddList}>
					<i className="fa fa-plus"></i><span>Add TODO List</span>
				</Button>
				<Popup showModal={this.state.showModal} close={this.close} name=""
					onPopupSubmit={this.handlePopup}/>
			</div>
		);
	},
});

module.exports = ListFrame;
