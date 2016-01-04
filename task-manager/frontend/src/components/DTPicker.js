var React = require('react'),
	DatePicker = require('react-toolbox/lib/date_picker');

const minDatetime = new Date();

var DTPicker = React.createClass({
	getInitialState: function() {
		return {
			date2: new Date(this.props.dline),
		};
	},
	handleChange: function(value, something) {
		// this.setState({...this.state, [item]: value});
		this.setState({date2: value});
		this.props.onDateChange({deadline: value});
		// console.log(item, value);
	},
	render() {
		return (
			<section>
				<DatePicker label='Deadline' minDate={minDatetime} onChange={this.handleChange} value={this.state.date2} />
			</section>
		);
	},
});

module.exports = DTPicker;
