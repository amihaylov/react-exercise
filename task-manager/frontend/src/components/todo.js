'use strict';
var React = require('react'),
	Button = require('react-bootstrap').Button,
	Popup = require('./popup'),
	Actions = require('../api/actions');

import DatePicker from './DTPicker';

var Todo = React.createClass({
	getInitialState: function() {
		return { showModal: false };
	},
	// Setting initial state, default method is editItem
	componentWillMount: function() {
		this.setState({method: 'editItem',
			stUrl: this.props.url + this.props.name});
	},
	close: function() {
		this.setState({ showModal: false });
	},
	// open: function() {
	// 	this.setState({ showModal: true });
	// },
	// We dont need strategy for deleting lists as we arent reusing components with it
	delTodo: function() {
		Actions.deleteItem(this.props.url + this.props.name);
	},
	// Setting different strategies, should be listed in actions.js
	// this.state.stUrl is set here and used in handler so we can extend
	// safely the handler
	openEditTodo: function() {
		this.setState({ showModal: true, method: 'editItem',});
	},
	// Strategy handler
	handlePopup: function(item) {
		if (Actions[this.state.method]) {
			Actions[this.state.method](this.state.stUrl, item);
		} else {
			console.log('Strategy ' + this.state.method + ' not yet implemented!');
		}
	},
	clickCheckbox: function(event) {
		var item = {done: event.target.checked};
		this.setState({method: 'editItem'});
		Actions[this.state.method](this.state.stUrl, item);
	},
	render: function() {
		var isDoneCSS = this.props.done ? 'finished' : '';
		var options = {value: new Date()};
		return (
			<div className="row">
				<div className="col col-md-1">
					<input type="checkbox" onClick={this.clickCheckbox}
					defaultChecked={this.props.done}/>
				</div>
				<div className={new Date(this.props.dline) <= new Date() ? 'overdue col col-md-4' : 'col col-md-4'} >
					<DatePicker dline={this.props.dline} onDateChange={this.handlePopup}/>
				</div>
				<div className="col col-md-5">
					<span className={isDoneCSS}>
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
