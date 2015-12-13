// __tests__/game-test.js

jest.dontMock('../src/components/game');

var React = require('react'), 
	ReactDOM = require('react-dom'),
	Game = require('../src/components/game');

describe('Testing Game component', function() {

	var node, component;	

	describe('test game props and state', function() {

		beforeEach(function() {
			node = document.createElement('div');
			component = ReactDOM.render(<Game size={3} />, node);
		});
		
		it('has to have correct props.size', function() {
			ReactDOM.render(<Game size={4} />, node);
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
				ReactDOM.render(<Game size={13} />, node);
			};
			expect(test).toThrow();
		});

	});

	// describe('test clicking and winning', () => {
		
	// 	beforeEach(() => {
	// 		node = document.createElement('div');
	// 		component = React.render(<Game value={3} />, node);
	// 	});

	// 	it('has to click on 0,0 and check if cell 0,0 belongs to player1', () => {
	// 		component.
	// 	});
	// });	

});