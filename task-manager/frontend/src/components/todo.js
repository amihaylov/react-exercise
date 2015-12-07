'use strict';
var React = require('react'),
	Button = require('react-bootstrap').Button,
	Popup = require('./popup');

var Todo = React.createClass({
	getInitialState() {
		return { showModal: false };
	},
	close() {
		this.setState({ showModal: false });
	},
	open() {
		this.setState({ showModal: true });
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
						<Button>
							<i className="fa fa-trash fa-lg"></i>
						</Button>
					</span> 
				</div>
				<Popup showModal={this.state.showModal} close={this.close} 
						name={this.props.name}/>
			</div>
		);
	}
});

module.exports = Todo;