const gulp = require('gulp');
const gutil = require("gulp-util");
const qiniu = require('gulp-qiniu');
const replace = require('gulp-replace');
const webpack = require('webpack');
const clean = require('gulp-clean');

const config = require('./config.json');
const type = config[process.argv[2]] ? process.argv[2] : 'dev';

const WebpackConfig = require('./webpack.prod')(config[type], config.v);

/*
清除任务
*/
gulp.task('clean', function () {
    return gulp.src(['./dist', './compiled'])
        .pipe(clean());

})

/*
webpack编译任务
*/
gulp.task('webpack', function (callback) {
    webpack(WebpackConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
        callback();
    })
})

/*
替换静态资源地址
*/
gulp.task('replace', function () {
    return gulp.src('./dist/index.html')
        .pipe(replace('./assets/static/', WebpackConfig.output.publicPath + 'assets/static/'))
        .pipe(gulp.dest('./dist/'));
})

/*
上传七牛
*/
gulp.task('upload', function () {
    return gulp.src('./dist/**')
        .pipe(qiniu({
            accessKey: config[type].ak,
            secretKey: config[type].sk,
            bucket: config[type].bk,
            private: false
        }, {
            dir: 'iapp/' + config.v + '/',
            versioning: false,
            versionFile: './config/images/images.json',
            ignore: [],
            concurrent: 10
        }))
})