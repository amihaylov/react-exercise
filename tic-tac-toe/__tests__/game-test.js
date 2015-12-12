// __tests__/game-test.js
// Using ES2015
jest.dontMock('../src/components/game.js');

import React from 'react'; 
import ReactDOM from 'react-dom';
const Game = require('../src/components/game.js');

describe('Testing Game component', () => {

	var node, component;	

	describe('test game props and state', () => {

		beforeEach(() => {
			node = document.createElement('div');
			component = React.render(<Game value={3} />, node);
		});
		
		it('has to have correct props.size', () => {
			React.render(<Game value={4} />, node);
			// Assert that `component` has updated its state in response to a prop change
			expect(component.props.size).toEqual(4);
		});

		it('has to have correctly initialized state', () => {
			expect(component.state.freezeBoard).toBe(false);
			expect(component.state.player).toEqual(1);
			expect(component.state.winner).toBe(false);
		});

		it('has to throw error on incorrect props.size', () => {
			// Assert that `component` has updated its state in response to a prop change
			expect(React.render(<Game value={13} />, node)).toThrowError("Height should be between 3 and 10.");
		});

	});

	describe('test clicking and winning', () => {
		
		beforeEach(() => {
			node = document.createElement('div');
			component = React.render(<Game value={3} />, node);
		});

		it('has to click on 0,0 and check if cell 0,0 belongs to player1', () => {
			component.
		});
	});	

});