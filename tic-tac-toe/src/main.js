/**
* @author Anton Mihaylov
* @name Entry point for tic-tac-toe main component
* @description Creates a Game component with the given size
*/
var React = require('react'),
	ReactDOM = require('react-dom'),
	Game = require('./components/game');

ReactDOM.render(<Game size={3} />, document.getElementById('app'));
