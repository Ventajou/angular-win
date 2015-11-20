var gulp = require('gulp');

gulp.task('build', ['images', 'fonts', 'sass', 'root', 'compile:demo', 'vendor', 'templates', 'examples']);
