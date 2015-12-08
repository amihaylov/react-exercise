'use strict';
var React = require('react'),
	Button = require('react-bootstrap').Button,
	Popup = require('./popup'),
	Todo = require('./todo');

var List = React.createClass({
	getInitialState: function() {
		return {url: this.props.url + this.props.name + '/tasks/',
				showModal: false};
	},
	close: function() {
		this.setState({ showModal: false });
	},
	open: function() {
		this.setState({ showModal: true });
	},
	handleTodoAdd: function(text) {
		var todo = {name: text};
		var xhr = new XMLHttpRequest();
		xhr.open('POST', this.props.url + this.props.name);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				alert(xhr.responseText);
			}
			else if (xhr.status !== 200) {
				alert('Request failed.  Returned status of ' + xhr.status);
				console.log('Ready state is ' + xhr.readyState);
			}
		};
		xhr.send(JSON.stringify(todo));
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
									<i className="fa fa-pencil fa-lg"></i>
									<i className="fa fa-trash fa-lg"></i>
								</span>
							</div>
						</div>
						<div className="row row-ver-centered">
							<div className="col col-md-1 col-ver-centered">
								<i className="fa fa-plus"></i>
							</div>
							<div className="col col-md-9 col-ver-centered">
								<input type="text" />
							</div>
							<div className="col col-md-2 col-ver-centered">
								<Button bsStyle="success" onClick={this.open}>
									Add Task</Button>
							</div>
						</div>
					</div>
				</div>
				<div className="panel-body">
					{todoNodes}
				</div>
					<Popup showModal={this.state.showModal} close={this.close}
						name={this.props.name} onPopupSubmit={this.handleTodoAdd}/>
			</div>
		);
	},
});

module.exports = List;
