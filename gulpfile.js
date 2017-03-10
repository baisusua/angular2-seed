var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');
require('./task/gulp.js');

gulp.task('dev', gulpSequence('clean','webpack','replace','git','upload'));

gulp.task('git',gulpSequence('init','add','commit','checkout','remote','push'));

// gulp.task('dev', gulpSequence('clean','webpack','replace','init','add','commit','checkout','remote','push','upload'));