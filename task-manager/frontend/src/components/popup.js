var React = require('react'),
	Button = require('react-bootstrap').Button,
	Modal = require('react-bootstrap').Modal;

import DatePicker from 'react-toolbox/lib/date_picker';

var Popup = React.createClass({
	getInitialState: function() {
		return {
			date: new Date(2015, 10, 16),
			min_datetime: new Date(),
		};
	},
	// Date Time picker only methods
	// handleChange: function(m) {
	// 	this.setState({m: m});
	// },
	handleSubmit: function() {
		var text = this.refs.text.value.trim();
		if (!text) {
			return;
		}
		this.props.onPopupSubmit({text: text});
		this.props.close();
	},
	render: function() {
		var body;
		switch (this.props.popupType) {
		default:
		case ('input'):
			body = <input type="text" ref="text" defaultValue={this.props.name} />;
			break;
		case ('dtpicker'):
			body = <DatePicker label='Expiration date' minDate={this.state.min_datetime} value={this.state.date} />;
			break;
		}
		return (
			<Modal show={this.props.showModal} onHide={this.props.close}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{body}
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.handleSubmit}>Save</Button>
					<Button onClick={this.props.close}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	},
});

module.exports = Popup;
