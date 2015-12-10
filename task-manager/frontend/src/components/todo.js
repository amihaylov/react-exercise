'use strict';
var React = require('react'),
	Button = require('react-bootstrap').Button,
	Popup = require('./popup'),
	Actions = require('../api/actions');

var Todo = React.createClass({
	getInitialState: function() {
		return { showModal: false };
	},
	close: function() {
		this.setState({ showModal: false });
	},
	open: function() {
		this.setState({ showModal: true });
	},
	// We dont need strategy for deleting lists as we arent reusing components with it
	delTodo: function() {
		Actions.deleteItem(this.props.url + this.props.name);
	},
	// Setting different strategies, should be listed in actions.js
	// this.state.stUrl is set here and used in handler so we can extend
	// safely the handler
	openEditTodo: function() {
		this.setState({ showModal: true, method: 'editItem',
			stUrl: this.props.url + this.props.name});
	},
	// Strategy handler
	handlePopup: function(data) {
		var item = {name: data.text};
		if (Actions[this.state.method]) {
			Actions[this.state.method](this.state.stUrl, item);
		} else {
			console.log('Strategy ' + this.state.method + ' not yet implemented!');
		}
	},
	render: function() {
		return (
			<div className="row">
				<div className="col col-md-1">
					<input type="checkbox" />
				</div>
				<div className="col col-md-9">
					<span>
						{this.props.name}
					</span>
				</div>
				<div className="col col-md-2">
					<span>
						<Button onClick={this.openEditTodo}>
							<i className="fa fa-pencil fa-lg"></i>
						</Button>
						<Button onClick={this.delTodo}>
							<i className="fa fa-trash fa-lg"></i>
						</Button>
					</span>
				</div>
				<Popup showModal={this.state.showModal} close={this.close}
						name={this.props.name} onPopupSubmit={this.handlePopup}/>
			</div>
		);
	},
});

module.exports = Todo;
