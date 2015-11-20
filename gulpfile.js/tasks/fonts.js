var gulp = require('gulp');

gulp.task('fonts', function() {
  var flatten = require('gulp-flatten');
  var newer = require('gulp-newer');
  var config = require('../config.js');

  return gulp.src([config.demoAppPath + '/fonts/**/*'])
    .pipe(flatten())
    .pipe(newer(config.demoBuildPath + '/fonts'))
    .pipe(gulp.dest(config.demoBuildPath + '/fonts'));
});
