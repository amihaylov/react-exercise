var express = require('express');
var router = express.Router({mergeParams: true});
var tasksCtrl = require('../controllers/tasksCtrl');

// middleware specific to this router
router.use(function timeLog(req, res, next) {
	console.log('Called tasks.js at: ', Date.now());
	next();
});
// define the home page route
router.route('/')
.all(function(req, res, next) {
	// runs for all HTTP verbs first
	// think of it as route specific middleware!
	console.log('Only POST uses /lists/:lname/tasks, GET is for all lists (routes in lists.js).');
	next();
})
.post(function(req, res, next) {
	return tasksCtrl.create(req, res);
})
.get(function(req, res, next) {
	next(new Error('Not implemented, use GET /, to return all lists.'));
});

router.route('/:tname')
.all(function(req, res, next) {
	// runs for all HTTP verbs first
	// think of it as route specific middleware!
	console.log("Running specific tasks routes...")
	next();
})
.get(function(req, res, next) {
	next(new Error('Not implemented, use GET /, to return all lists.'));
})
.post(function(req, res, next) {
	next(new Error('Not implemented, use POST without :tname , to post a list.'));
})
.put(function(req, res, next) {
	return tasksCtrl.update(req, res);
})
.delete(function(req, res, next) {
	return tasksCtrl.delete(req, res);
});

module.exports = router;