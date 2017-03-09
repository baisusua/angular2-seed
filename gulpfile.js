var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');
require('./task/gulp.js');

gulp.task('dev', gulpSequence('clean','webpack','replace','upload'));


// gulp.task('dev', gulpSequence('clean','webpack','replace','open','init','add','commit','checkout','remote','push','upload'));