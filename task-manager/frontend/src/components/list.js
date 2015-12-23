'use strict';
var React = require('react'),
	Button = require('react-bootstrap').Button,
	Popup = require('./popup'),
	Todo = require('./todo'),
	Actions = require('../api/actions');

var List = React.createClass({
	getInitialState: function() {
		return {url: this.props.url + this.props.name + '/tasks/',
				showModal: false};
	},
	close: function() {
		this.setState({ showModal: false });
	},
	// We dont need strategy for deleting lists as we arent reusing components (Popup) with it
	delList: function() {
		Actions.deleteItem(this.props.url + this.props.name);
	},
	// Setting different strategies, should be listed in actions.js
	// this.state.stUrl is set here and used in handler so we can extend
	// safely the handler
	openEditList: function() {
		this.setState({ showModal: true, method: 'editItem',
			stUrl: this.props.url + this.props.name});
	},
	openAddTodo: function() {
		this.setState({ showModal: true, method: 'addItem',
			stUrl: this.props.url + this.props.name + '/tasks/' });
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
		var self = this;
		var todoNodes = this.props.tasks.map(function(todo, index) {
			// `key` is a React-specific concept and is not mandatory for the
			// purpose of this tutorial. if you're curious, see more here:
			// http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
			return (
				<Todo name={todo.name} key={index}
						done={todo.done} dline={todo.deadline}
						lname={self.props.name} url={self.state.url}/>
			);
		});
		return (
			<div>
				<div className="panel panel-default">
					<div className="panel-heading">
						<div className="row row-ver-centered">
							<div className="col col-md-1 col-ver-centered">
								<i className="fa fa-calendar fa-lg"></i>
							</div>
							<div className="col col-md-9 col-ver-centered">
								<h2>{this.props.name}</h2>
							</div>
							<div className="col col-md-2 col-ver-centered">
								<span>
									<Button onClick={this.openEditList}>
										<i className="fa fa-pencil fa-lg"></i>
									</Button>
									<Button onClick={this.delList}>
										<i className="fa fa-trash fa-lg"></i>
									</Button>
								</span>
							</div>
						</div>
						<div className="row row-ver-centered">
							<div className="col col-md-1 col-ver-centered">
								<i className="fa fa-plus"></i>
							</div>
							<div className="col col-md-9 col-ver-centered">
							</div>
							<div className="col col-md-2 col-ver-centered">
								<Button bsStyle="success" onClick={this.openAddTodo}>
									Add Task</Button>
							</div>
						</div>
					</div>
				</div>
				<div className="panel-body">
					{todoNodes}
				</div>
					<Popup showModal={this.state.showModal} close={this.close}
						name={this.props.name} onPopupSubmit={this.handlePopup}/>
			</div>
		);
	},
});

module.exports = List;
