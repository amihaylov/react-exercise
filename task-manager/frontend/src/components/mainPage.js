'use strict';
var React = require('react'),
	ListFrame = require('./listFrame'),
	Actions = require('../api/actions');

var MainPage = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.initData();
		// Refreshing every pollInterval ms, in FLUX might not be needed
		// setInterval(this.initData, this.props.pollInterval);
	},
	initData: function() {
		var self = this;
		Actions.loadDataFromServer(this.props.url + '/lists', function(data) {
			self.setState({data: data});
		});
	},
	render: function() {
		return (
			<ListFrame data={this.state.data} url={this.props.url + '/lists/'}/>
		);
	},
});

module.exports = MainPage;
