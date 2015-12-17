/*eslint-disable strict*/

var $ = require('jquery'),
	React = require('react'),
	RouteHandler = require('react-router').RouteHandler;
var Header = require('./common/header');


var App = React.createClass({
	render: function() {
		return (
			<div>
				<Header/>
				<div className='container-fluid'>
					<RouteHandler/>
				</div>
			</div>
		);
	},
});
module.exports = App;
