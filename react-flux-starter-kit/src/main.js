'use strict';


var React = require('react'),
	Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

// 2nd paramater is route format, without it it will use hashes (e.g. #about)
// With Router.HistoryLocation it will use HTML5 History Location (does not support IE8,9)
Router.run(routes, Router.HistoryLocation, function(Handler) {
	React.render(<Handler/>, document.getElementById('app'));
});
