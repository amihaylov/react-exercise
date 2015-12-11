var React = require('react'),
	ReactDOM = require('react-dom'),
	Game = require('./components/game');

ReactDOM.render(<Game size={3} />, document.getElementById('app'));
