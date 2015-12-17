var React = require('react'),
	ReactDOM = require('react-dom'),
	Game = require('./game');
/**
* @constructor
* @name Selector
* @description
* Initializator component, receives a value from a select input, player names and initializes the Game
*/
var Selector = React.createClass({
	/** @method
	* @name Selector#handleSelect
	* @param {DOMelement} e The selected option
	* @description
	* Handles the selection event and renders a Game component if there are no errors.
	* Also removes the selector.
	*/
	handleSelect: function(e) {
		var playerNames = [],
			options = e.target.options,
			value;
		playerNames[1] = this.refs.player1.value.trim() || 'Player 1';
		playerNames[2] = this.refs.player2.value.trim() || 'Player 2';
		for (var i = 0, l = options.length; i < l; i++) {
			if (options[i].selected) {
				value = options[i].value;
			}
		}
		value = parseInt(value, 10);
		try {
			ReactDOM.render(<Game size={value} playerNames={playerNames}/>, document.getElementById('app'));
			document.getElementById('selector').remove();
		} catch (err) {
			console.error(err);
		}
	},
	/** @method
	* @name Selector#render
	* @description
	* React system method, returns the compiled DOM element in this case the selector.
	* @returns DOMelement
	*/
	render: function() {
		var values = [];
		for (var i = 3; i < 11; i++) {
			values.push(i);
		}
		var optionsNodes = values.map(function(value, index) {
			return (<option key={index} defaultValue={value}>{value}</option>);
		});

		return (
			<div>
				<input type="text" placeholder="Player 1 Name" ref="player1" />
				<input type="text" placeholder="Player 2 Name" ref="player2" />
				<select onChange={this.handleSelect}>
					<option defaultValue={''} disabled selected style={{display: 'none'}}>Select board size</option>
					{optionsNodes}
				</select>
			</div>
			);
	},
});

module.exports = Selector;
