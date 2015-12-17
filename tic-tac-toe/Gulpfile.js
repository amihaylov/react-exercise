var browserify = require('browserify'), // Bundles JS
	babelify = require("babelify"),
	gulp = require('gulp'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	shell = require('gulp-shell'),
	reactify = require('reactify'), // Transforms React JSX to JS
	source = require('vinyl-source-stream');

var config = {
	paths: {
		dist: './dist',
		js: './src/**/*.js',
		mainJs: './src/main.js',
		mainTest: './tests/game-test.js',
		distTest: '__tests__',
	},
};

gulp.task('sass', function() {
	gulp.src('styles/*.scss')
		.pipe(sass({
			onError: function(e) {
				console.log(e);
			},
		}))
		.pipe(gulp.dest('styles/'))
		.pipe(connect.reload());
});


gulp.task('doc', shell.task([
	'echo "\033[0;36m Generates js documentation using jsdoc and docstrap.\033[0m"',
	'./node_modules/.bin/jsdoc src/components/*.js -c ./node_modules/ink-docstrap/template/jsdoc.conf.json -t ./node_modules/ink-docstrap/template',
]));

gulp.task('default', ['connect', 'watch']);

gulp.task('build-js', function() {
	browserify(config.paths.mainJs)
		.transform(babelify, {presets: ['es2015', 'react']})
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('build-test', function() {
	browserify(config.paths.mainTest)
		.transform(babelify, {presets: ['es2015', 'react']})
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.distTest))
		.pipe(connect.reload());
});

gulp.task('build', ['sass', 'build-js']);

gulp.task('watch', function() {
	gulp.watch([config.paths.js,'./*.js'], ['build-js']);
	gulp.watch('styles/*.scss', ['sass']);
});

gulp.task('connect', function() {
	connect.server({
		root: ['./'],
		port: 9003,
		livereload: true,
		open: {
			browser:  'Google Chrome', //'chrome'
		},
	});
});
