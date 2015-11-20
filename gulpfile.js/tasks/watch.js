var gulp = require('gulp');

gulp.task('default', ['build'], function () {
  var config = require('../config.js');
  var watch = require('gulp-watch');
  var browserSync = require('browser-sync').create();

  watch(config.demoAppPath + '/*.*', function () { gulp.start('root'); });
  watch(config.demoAppPath + '/styles/**/*.scss', function () { gulp.start('sass'); });
  watch(['src/**/*.ts', 'src/**/*.xml', config.demoAppPath + '/src/**/*.ts'], function () { gulp.start('compile:demo'); });
  watch(config.demoAppPath + '/src/**/*.html', function () { gulp.start('templates'); });
  watch(config.demoAppPath + '/images/**/*', function () { gulp.start('images'); });
  watch(config.demoAppPath + '/fonts/**/*', function () { gulp.start('fonts'); });
  watch('bower.json', function () { gulp.start('vendor'); });
  watch(config.demoAppPath + '/appService/*.js', function() { gulp.start('appService'); });

  watch([
    config.demoBuildPath + '/*.html',
    config.demoBuildPath + '/js/*.js',
    config.demoBuildPath + '/css/*.css'
  ], browserSync.reload);

  browserSync.init({
    open: false,
    server: {
      baseDir: config.demoBuildPath
    }
  });
});