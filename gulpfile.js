var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');
require('./task/gulp.js');

gulp.task('dev', gulpSequence('clean','webpack','replace','upload'));