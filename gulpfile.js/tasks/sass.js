var gulp = require('gulp');

gulp.task('sass', function () {
  var config = require('../config.js');
  var flatten = require('gulp-flatten');
  var sourcemaps = require('gulp-sourcemaps');
  var sass = require('gulp-sass');
  var postcss = require('gulp-postcss');

	gulp.src(config.demoAppPath + '/styles/*.scss', { base: config.demoAppPath })
		.pipe(sourcemaps.init({ debug: true }))
		.pipe(sass({
			errLogToConsole: true,
			precision: 10,
			includePaths: config.sassIncludePaths
		}).on('error', sass.logError))
		// .pipe(sourcemaps.write({ includeContent: false }))
		// .pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(postcss(config.processors))
		.pipe(flatten())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.demoBuildPath + '/css'));
});
