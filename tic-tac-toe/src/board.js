function Board(height) {
	if (typeof height !== 'number') {
		throw new Error('Height must be a number');
	}

	if (height < 3 || height > 10) {
		throw new Error('Height should be between 3 and 10.');
	}

	// Check if all elements in an array are equal
	var areAllEqual = function(arr) {
		return !arr.some(function(val, i, subArr) {
			return val !== subArr[0];
		});
	};

	this.height = height;
	this.board = [];

	for (var i = 0; i < this.height; i++) {
		var row = [];
		for (var j = 0; j < this.height; j++) {
			row.push(0);
		}
		this.board.push(row);
	}

	// Get size of board
	this.getSize = function() {
		return this.height;
	};

	// Get cell by its coordinates
	this.getCell = function(x, y) {
		return this.board[x][y];
	};

	// Assign a cell on the board to a given player.
	this.move = function(x, y, player) {
		this.board[x][y] = player;
	};

	// Check status of the game
	// Returns player number, 3 in the case of a tie, or false if no winner.
	this.checkStatus = function() {
		var winner = false,
			boardSize = this.getSize();

		// Check rows
		for (var rowIdx = 0; rowIdx < boardSize; rowIdx ++) {
			var row = this.board[rowIdx];
			if (areAllEqual(row) && row[0] > 0) {
				winner = row[0];
				return winner;
			}
		}

		// Check columns
		for (var rowIdx = 0; rowIdx < boardSize; rowIdx ++) {
			var col = [];
			for (var colIdx = 0; colIdx < boardSize; colIdx ++) {
				col.push(this.getCell(colIdx, rowIdx));
			}
			if (areAllEqual(col) && col[0] > 0) {
				winner = col[0];
				return winner;
			}
		}

		// Check diagonals
		var diags = {left: [], right: []};
		for (var i = 0; i < boardSize; i++) {
			diags.left.push(this.getCell(i, i));
			diags.right.push(this.getCell(boardSize - i - 1, i));
		}

		for (var keys in diags) {
			if (diags.hasOwnProperty(keys)) {
				var diag = diags[keys];
				if (areAllEqual(diag) && diag[0] > 0) {
					winner = diag[0];
					return winner;
				}
			}
		}

		// Check tie
		var tie = !this.board.reduce(function(a, b) {
			return a.concat(b);
		}).some(function(cell) {
			return cell === 0;
		});
		if (tie) {
			winner = 3;
		}
		return winner;
	};
}


module.exports = Board;
