var browserify = require('browserify'), // Bundles JS
    babelify = require("babelify"),
    gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    reactify = require('reactify'), // Transforms React JSX to JS
    source = require('vinyl-source-stream'),
    webpack = require('webpack'),
    gulpWebpack = require('gulp-webpack'),
    webpackConfig = require('./webpack.config.js');

//TODO Sass
// gulp.task('sass', function() {
//     return sass('./styles/styles.scss')
//         .on('error', sass.logError)
//         .pipe(gulp.dest('./styles/'));
// });

gulp.task('sass', function() {
    gulp.src('styles/*.scss')
        .pipe(sass({
            onError: function(e) {
                console.log(e);
            }
        }))
        .pipe(gulp.dest('styles/'))
        .pipe(connect.reload());
});


gulp.task('connect', function() {
    return connect.server();
});

gulp.task('default', ['build', 'connect', 'watch']);

// In case we want to use browserify
// main.js and all js files should use AMD or Commonjs style modules

var config = {
    paths: {
        dist: './dist',
        js: './src/**/*.js',
        mainJs: './src/main.js'
    }
};

gulp.task('browserify', function() {
    browserify(config.paths.mainJs)
        .transform(babelify, {presets: ["es2015", "react"]})
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('webpack', function() {
	return gulp.src('src/main.js')
	.pipe(gulpWebpack(webpackConfig, webpack))
	.pipe(gulp.dest(config.paths.dist))
	.pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch([config.paths.js,'./*.js'], ['browserify']);
    gulp.watch('styles/*.scss', ['sass']);
});

gulp.task('build', ['sass', 'browserify']);
