var gulp = require('gulp');

gulp.task('examples', ['copy:lib'], function () {
  var config = require('../config.js');
  var templateCache = require('gulp-angular-templatecache');
  var uglify = require('gulp-uglify');
  // var merge = require('merge2');
  // var ts = require('gulp-typescript');
  // var filter = require('gulp-filter');
  // var rename = require("gulp-rename");
  // var path = require('path');
  var templateHeader = 'angular.module("<%= module %>"<%= standalone %>).run(["CacheFactory", function(CacheFactory) { var cache = CacheFactory("examples"); ';
  var templateBody = 'cache.put("<%= url %>","<%= contents %>");';

  // var tsResult = gulp.src([
  //   config.demoAppPath + '/src/app.ts',
  //   config.demoAppPath + '/src/**/*.ts'
  // ])
  //   .pipe(ts({
  //     noImplicitAny: true,
  //     removeComments: false,
  //     target: 'ES5'
  //   }));

  // return merge(
  //   tsResult.js
  //     .pipe(filter('**/sample.js'))
  //     .pipe(rename(function (file) {
  //       var p = file.dirname.split(path.sep);
  //       file.dirname = p.slice(p.indexOf('src') + 1).join(path.sep);
  //       console.log(file);
  //     }))
  //   ,
  //   gulp.src([config.demoAppPath + '/src/**/sample.*'])
  //   )
  //   .pipe(templateCache('samples.js', {
  //     module: config.demoAppModule,
  //     templateHeader: templateHeader,
  //     templateBody: templateBody
  //   }))
  //   .pipe(uglify({ mangle: true }))
  //   .pipe(gulp.dest(config.demoBuildPath + '/js'));

  return gulp.src([config.demoAppPath + '/src/**/sample.*'])
    .pipe(templateCache('samples.js', {
      module: config.demoAppModule,
      templateHeader: templateHeader,
      templateBody: templateBody
    }))
    .pipe(uglify({ mangle: true }))
    .pipe(gulp.dest(config.demoBuildPath + '/js'));
});
