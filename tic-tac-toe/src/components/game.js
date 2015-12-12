var React = require('react'),
	Board = require('../board');

var Game = React.createClass({
	getInitialState: function() {
		this.board = new Board(this.props.size);
		return {player: 1, freezeBoard: false, winner: false};
	},
	// Switch between players
	nextPlayer: function() {
		return this.state.player === 1 ? 2 : 1;
	},
	// Make a move on an empty cell on the board and check for winner
	move: function(x, y, player) {
		// Using ES6 promises
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
	// Handle a move event and switch to the next player when finished
	// captures the chosen event and uses the "data-" attributes
	playerMove: function(event) {
		var [x, y] = event.target.dataset.cell.split('_');
		var isEmpty = this.board.getCell(x, y) === 0;

		if (isEmpty) {
			this.move(x, y, this.state.player)
			.then(this.setState({player: this.nextPlayer()}))
			.catch(console.log('No winner yet!'));
		}
	},
	// Resets the board for a new game
	reset: function() {
		this.board = new Board(this.props.size);
		this.setState({player: 1, freezeBoard: false, winner: false});
	},
	render: function() {
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
