var gulp = require('gulp');

gulp.task('images', function() {
  var newer = require('gulp-newer');
  var config = require('../config.js');
  var imagemin = require('gulp-imagemin');

  return gulp.src([config.demoAppPath + '/images/**/*'])
    .pipe(newer(config.demoBuildPath + '/images'))
    .pipe(imagemin())
    .pipe(gulp.dest(config.demoBuildPath + '/images'));
});
