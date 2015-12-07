'use strict';
var React = require('react'),
	Button = require('react-bootstrap').Button,
	Todo = require('./todo');

var List = React.createClass({
	render: function() {
		var self = this.props;
		var todoNodes = this.props.tasks.map(function(todo, index) {
			// `key` is a React-specific concept and is not mandatory for the
			// purpose of this tutorial. if you're curious, see more here:
			// http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
			return (
				<Todo name={todo.name} key={index} 
						done={todo.done} dline={todo.deadline}
						lname={self.name} >
				</Todo>
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
								<Button bsStyle="success">Add Task</Button>
							</div>
						</div>
					</div>
				</div>
				<div className="panel-body">
					{todoNodes}
				</div>
			</div>
		);
	}
});

module.exports = List;