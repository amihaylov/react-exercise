var express = require('express');
var router = express.Router();
var listsCtrl = require('../controllers/listsCtrl');

// middleware specific to this router
router.use(function timeLog(req, res, next) {
	next();
});

// define the home page route
router.get('/', function(req, res) {
	return listsCtrl.getAll(req, res);
});

router.post('/',function(req, res, next) {
	return listsCtrl.create(req, res);
});

router.route('/:lname')
.all(function(req, res, next) {
	// runs for all HTTP verbs first
	// think of it as route specific middleware!
	next();
})
.get(function(req, res, next) {
	next(new Error('Not implemented, use GET /, to return all lists.'));
})
.post(function(req, res, next) {
	next(new Error('Not implemented, use POST /, to create a list.'));
})
.put(function(req, res, next) {
	console.log(req.body);
	return listsCtrl.update(req, res);
})
.delete(function(req, res, next) {
	return listsCtrl.delete(req, res);
});

// Add nested routes
var taskRouter = require('./tasks');
router.use('/:lname/tasks', taskRouter);

module.exports = router;