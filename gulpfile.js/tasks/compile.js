var gulp = require('gulp');

gulp.task('compile:demo', ['copy:lib'], function () {
  var newer = require('gulp-newer');
  var sourcemaps = require('gulp-sourcemaps');
  var ts = require('gulp-typescript');
  var concat = require('gulp-concat');
  var annotate = require('gulp-ng-annotate');
  var uglify = require('gulp-uglify');
  var config = require('../config.js');

  var tsResult = gulp.src([
    config.demoAppPath + '/typings/tsd.d.ts',
    config.demoAppPath + '/src/app.ts',
    config.demoAppPath + '/src/**/*.ts'
  ], { base: config.demoAppPath })
    .pipe(newer(config.demoBuildPath + '/js/app.js'))
    .pipe(sourcemaps.init())
    .pipe(ts({
      noImplicitAny: true,
      removeComments: true,
      target: 'ES5'
    }));

  return tsResult.js
    .pipe(annotate())
    .pipe(concat('app.js'))
    .pipe(uglify({ mangle: false, compress: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.demoBuildPath + '/js'));
});
