var gulp = require('gulp');

gulp.task('compile:lib', function () {
  var sourcemaps = require('gulp-sourcemaps');
  var ts = require('gulp-typescript');
  var concat = require('gulp-concat');
  var annotate = require('gulp-ng-annotate');
  var uglify = require('gulp-uglify');
  var config = require('../config.js');
  var merge = require('merge2');
  var templateCache = require('gulp-angular-templatecache');
  var order = require("gulp-order");

  var tsResult = gulp.src(['src/typings/tsd.d.ts', 'src/module.ts', 'src/**/*.ts'], { base: 'src' })
    .pipe(sourcemaps.init())
    .pipe(ts({
      noImplicitAny: true,
      declarationFiles: true,
      noExternalResolve: true,
      removeComments: false,
      target: 'ES5'
    }));

  return merge([
    tsResult.dts
      .pipe(concat('angular-win.d.ts'))
      .pipe(gulp.dest(config.libBuildPath + '/typings')),
    merge([
      tsResult.js.pipe(annotate()),
      gulp.src('src/**/*.xml')
        .pipe(templateCache({
          module: 'ngWin'
        }))
        .pipe(sourcemaps.init())
      ])
      .pipe(order(['**/*', 'template*']))
      .pipe(concat('angular-win.js'))
      .pipe(uglify({ mangle: true, compress: true }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.libBuildPath))
    ]);
});

gulp.task('copy:lib', ['compile:lib'], function() {
  gulp.src(['.tmp/build/*.js', '.tmp/build/*.js.map'])
    .pipe(gulp.dest('.tmp/demo/js'));
});
