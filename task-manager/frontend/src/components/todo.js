'use strict';
var React = require('react'),
	Button = require('react-bootstrap').Button,
	Popup = require('./popup');

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
	handleTodoEdit: function(text) {
		var todo = {name: text};
		var xhr = new XMLHttpRequest();
		xhr.open('PUT', this.props.url + this.props.name, true);
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
	handleTodoDelete: function() {
		var xhr = new XMLHttpRequest();
		xhr.open('DELETE', this.props.url + this.props.name, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				alert(xhr.responseText);
			}
			else if (xhr.status !== 200) {
				alert('Request failed.  Returned status of ' + xhr.status);
				console.log('Ready state is ' + xhr.readyState);
			}
		};
		xhr.send();
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
						<Button onClick={this.open}>
							<i className="fa fa-pencil fa-lg"></i>
						</Button>
						<Button onClick={this.handleTodoDelete}>
							<i className="fa fa-trash fa-lg"></i>
						</Button>
					</span>
				</div>
				<Popup showModal={this.state.showModal} close={this.close}
						name={this.props.name} onPopupSubmit={this.handleTodoEdit}/>
			</div>
		);
	},
});

module.exports = Todo;
