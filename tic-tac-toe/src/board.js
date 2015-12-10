function Board(height) {
	if (typeof height !== 'number') {
		throw new Error('Height must be a number');
	}

	if (height !== 3) {
		throw new Error('Height should be 3.');
	}
}

module.exports = Board;
