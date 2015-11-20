var gulp = require('gulp');

// Remove all the things!
gulp.task('clean', function(cb) {
  var config = require('../config.js');
  var del = require('del');
  del(config.tempPath + '/**/*', cb);
});
