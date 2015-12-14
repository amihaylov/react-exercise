var React = require('react'),
	Board = require('../board');

/**
* @constructor
* @name Game
* @description
* Main tic-tac-toe component, creates a board, initializes it with the given size and handles any click event.
* ### Usage
* ```javascript
* ReactDOM.render(<Game size={3} />, document.getElementById('app'));
* ```
*/
var Game = React.createClass({
	/** @method
	* @name Game#getInitialState
	* @description
	* React system method, initializes state with given parameters
	*/
	getInitialState: function() {
		/**
		* @readonly Game#this.props.size
		*/
		try {
			this.board = new Board(this.props.size);
			return {player: 1, freezeBoard: false, winner: false};
		} catch (err) {
			/**
			* @throws Throws error if size is not a number or out of [3;10] interval
			*/
			throw new Error(err);
		}
	},
	/** @method
	* @name Game#nextPlayer
	* @description
	* Switch to next player
	*/
	nextPlayer: function() {
		return this.state.player === 1 ? 2 : 1;
	},
	/** @method
	* @name Game#move
	* @param {number} x Cell x coordinate
	* @param {number} y Cell y coordinate
	* @param {number} player Which player have clicked on cell
	* @returns ES2015 Promise
	* @description
	* Make a move on an empty cell on the board and check for winner
	*/
	move: function(x, y, player) {
		var self = this;
		return new Promise(function(resolve, reject) {
			self.board.move(x, y, player);
			var winner = self.board.checkStatus();

			if (winner) {
				self.setState({winner, freezeBoard: true});
				reject();
			} else {
				self = {};
				resolve();
			}
		});
	},
	/** @method
	* @name Game#playerMove
	* @param {DOMevent} event Click event to be handled.
	* @description
	* Handle a move event and switch to the next player when finished,
	* captures the chosen event and uses the "data-" attributes
	*/
	playerMove: function(event) {
		var [x, y] = event.target.dataset.cell.split('_');
		var isEmpty = this.board.getCell(x, y) === 0;

		if (isEmpty) {
			this.move(x, y, this.state.player)
			.then(this.setState({player: this.nextPlayer()}))
			.catch(console.log('No winner yet!'));
		}
	},
	/** @method
	* @name Game#reset
	* @description
	* Resets the board (and its state) for a new game
	*/
	reset: function() {
		this.board = new Board(this.props.size);
		this.setState({player: 1, freezeBoard: false, winner: false});
	},
	/** @method
	* @name Game#render
	* @description
	* React system method, returns the compiled DOM element
	* @returns DOMelement
	*/
	render: function() {
		/**
		* DOM element to be displayed when a player wins or there is a tie.
		* Also contains a Reset button.
		*/
		var announcement;

		if (this.state.winner) {
			var msg = this.state.winner > 2 ? 'It is a tie' : 'Player ' +
			this.state.winner + ' wins!';
			announcement = (
				<div className='announcement'>
					<p>{msg}</p>
					<button onClick={this.reset}>
					Reset</button>
				</div>
			);
		}

		var self = this;
		var grid = this.board.board.map(function(row, rowIdx) {
			var cells = row.map(function(cell, cellIdx) {
				var classStr = {
						0: 'empty-cell',
						1: 'player1',
						2: 'player2',
					},
					coords = rowIdx + '_' + cellIdx,
					clickHandler;

				if (!self.state.freezeBoard) {
					clickHandler = self.playerMove;
				}

				return (<div className={classStr[cell]} key={cellIdx}
						onClick={clickHandler} data-cell={coords}>
						</div>);
			});

			return (<div className='row' key={rowIdx}>{cells}</div>);
		});

		return (
			<div className='grid'>
				{grid}
				{announcement}
			</div>
			);
	},
});

module.exports = Game;
