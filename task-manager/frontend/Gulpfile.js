var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

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

gulp.task('sass:watch', function() {
    gulp.watch('./**/*.scss', ['sass']);
});

gulp.task('connect', function() {
    connect.server();
});

gulp.task('default', ['connect', 'sass:watch']);

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