var React = require('react'),
	ReactDOM = require('react-dom'),
	MainPage = require('./components/mainPage');

ReactDOM.render(<MainPage url="http://localhost:7171" pollInterval={2000}/>, document.getElementById('app'));
