var gulp = require('gulp');
var gulpBrowser = require("gulp-browser");
var reactify = require('reactify');
var del = require('del');
var size = require('gulp-size');

/* TASKS */

gulp.task('transform', function () {
  var stream = gulp.src('./static/scripts/jsx/*.js')
    .pipe(gulpBrowser.browserify({transform: ['reactify']}))
    .pipe(gulp.dest('./static/scripts/js/'))
    .pipe(size());
  return stream;
});

gulp.task('del', function () {
  return del(['./static/scripts/js']);
});

gulp.task('default', ['del'], function () {
  gulp.start('transform');
  gulp.watch('./static/scripts/jsx/*.js', ['transform']);
});
