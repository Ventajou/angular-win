var gulp = require('gulp');

gulp.task('root', function() {
  var newer = require('gulp-newer');
  var config = require('../config.js');

  return gulp.src([config.demoAppPath + '/*.ico', config.demoAppPath + '/*.html', config.demoAppPath + '/*.xml'])
    .pipe(newer(config.demoBuildPath))
    .pipe(gulp.dest(config.demoBuildPath));
});
