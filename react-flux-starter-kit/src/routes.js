"use strict";

var React = require('react'),
	Router = require('react-router'),
	DefaultRoute = Router.DefaultRoute,
	Route = Router.Route,
	NotFoundRoute = Router.NotFoundRoute,
	Redirect = Router.Redirect;

	// If there is no path, React Router assumes name for a path
var routes = (
		<Route name='app' path='/' handler={require('./components/app')}>
			<DefaultRoute handler={require('./components/homePage')}/>
			<Route name='authors' handler={require('./components/authors/authorPage')}/>
			<Route name='addAuthor' path='author' handler={require('./components/authors/manageAuthorPage')}/>
			<Route name='manageAuthor' path='author/:id' handler={require('./components/authors/manageAuthorPage')}/>
			<Route name='about' handler={require('./components/about/about')}/>
			<NotFoundRoute handler={require('./components/notFoundPage')}/>
			<Redirect from='about-us' to='about'/>
			<Redirect from='awthurs' to='authors'/>
			<Redirect from='about/*' to='about'/>
		</Route>
	);
module.exports = routes;
