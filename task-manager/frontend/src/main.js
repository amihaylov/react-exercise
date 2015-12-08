var React = require('react'),
	ReactDOM = require('react-dom'),
	MainPage = require('./components/mainPage');

var data = [
  {
    "_id": "5655a77b7cff1d382332b997",
    "name": "Grocery",
    "__v": 0,
    "tasks": []
  },
  {
    "_id": "5655aba77cff1d382332b998",
    "name": "Diploma",
    "__v": 0,
    "tasks": []
  },
  {
    "_id": "5655b043a709e2841653111f",
    "name": "House",
    "__v": 3,
    "tasks": [
      {
        "name": "Clean House",
        "_id": "5655c66ce4218fe42b81906b",
        "deadline": "2015-11-25T14:32:12.135Z",
        "done": true
      },
      {
        "name": "Paint doors",
        "_id": "5655d1dce4218fe42b81906f",
        "deadline": "2015-11-25T15:21:00.901Z",
        "done": false
      }
    ]
  }
];

ReactDOM.render(<MainPage url="http://localhost:7171"/>, document.getElementById('app'));
