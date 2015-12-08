'use strict';
var React = require('react'),
	ListFrame = require('./listFrame');

var MainPage = React.createClass({
	loadDataFromServer: function() {
		var self = this;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', this.props.url + '/lists', true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				self.setState({data: JSON.parse(xhr.responseText)});
			}
			else if (xhr.status !== 200) {
				alert('Request failed.  Returned status of ' + xhr.status);
				console.log('Ready state is ' + xhr.readyState);
			}
		};
		xhr.send();
	},
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	render: function() {
		return (
			<ListFrame data={this.state.data} url={this.props.url + '/lists/'}/>
		);
	},
});

module.exports = MainPage;
