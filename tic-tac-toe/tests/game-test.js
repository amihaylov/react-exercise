// __tests__/game-test.js

jest.dontMock('../src/components/game');

var React = require('react'),
	ReactDOM = require('react-dom'),
	Game = require('../src/components/game');

describe('Testing Game component', function() {

	var node, node2, component, componentClick;

	describe('test game props and state', function() {

		beforeEach(function() {
			node = document.createElement('div');
			component = ReactDOM.render(<Game size={3} />, node);
		});
		
		it('has to have correct props.size', function() {
			component = ReactDOM.render(<Game size={4} />, node);
			// Assert that `component` has updated its state in response to a prop change
			expect(component.props.size).toEqual(4);
		});

		it('has to have correctly initialized state', function() {
			expect(component.state.freezeBoard).toBe(false);
			expect(component.state.player).toEqual(1);
			expect(component.state.winner).toBe(false);
		});

		it('has to throw error on incorrect props.size', function() {
			// Assert that `component` has updated its state in response to a prop change
			var test = function() {
				try {
					component = ReactDOM.render(<Game size={13} />, node);
					component.getInitialState();
				} catch (err) {
					throw new Error(err);
				}
			};
			expect(test).toThrow();
		});


		it('has to click on 0,0 and check if cell 0,0 belongs to player1', function() {
			var event = {
				target: {
					dataset: {
						cell: '0_0',
					},
				},
			};
			component.playerMove(event);

			// Game starts with player 1
			expect(component.board.board[0][0]).toEqual(1);
		});

		// Expect player 1 to win via diagonal 0,2; 1,1; 2,0
		it('has to click 7 times from 0,0 to 2,0 and have player 1 as winner', function() {
			var event = {};
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					event = {
						target: {
							dataset: {
								cell: i + '_' + j,
							},
						},
					};
					component.playerMove(event);
				}
			}

			expect(component.state.freezeBoard).toBe(true);
			expect(component.state.winner).toBe(1);
		});
	});

});