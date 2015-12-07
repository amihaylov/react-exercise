var React = require('react'),
	Button = require('react-bootstrap').Button,
	Modal = require('react-bootstrap').Modal;

var Popup = React.createClass({
	render: function() {
		return(
			<Modal show={this.props.showModal} onHide={this.props.close}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<input type="text" defaultValue={this.props.name} />
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.handleEdit}>Save</Button>
					<Button onClick={this.props.close}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}
});

module.exports = Popup;