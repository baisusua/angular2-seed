const gulp = require('gulp');
const gutil = require("gulp-util");
const qiniu = require('gulp-qiniu');
const replace = require('gulp-replace');
const webpack = require('webpack');
const clean = require('gulp-clean');
const git = require('gulp-git');
const exec = require('child_process').exec;

const config = require('./config.json');
const type = config[process.argv[2]] ? process.argv[2] : 'dev';

const WebpackConfig = require('./webpack.prod')(config[type], config.v);

/*
清除任务
*/
gulp.task('clean', function () {
    return gulp.src(['./dist/*', './compiled/*'])
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
创建子进程打开子git目录
*/
gulp.task('open', function (callback) {
    exec('cd dist', function (error, stdout, stderr) {
        callback()
    })
})

/*
git初始化
*/
gulp.task('init', function (callback) {
    exec('git init', function (error, stdout, stderr) {
        callback()
    })
})


/*
git添加
*/
gulp.task('add', function (callback) {
    exec('git add index.html', function (error, stdout, stderr) {
        callback()
    })
});

/*
git添加远程仓库
*/

/*
git提交
*/
gulp.task('commit', function (callback) {
    exec('git commit -m '+'发布时间:'+new Date(), function (error, stdout, stderr) {
        callback()
    })
});

/*
创建并切换分支
*/
gulp.task('checkout', function (callback) {
    exec('git checkout -b '+config[type].branch, function (error, stdout, stderr) {
        callback()
    })
});

/*
添加远程仓库
*/
gulp.task('remote', function (callback) {
    exec('git remote add origin '+config[type].remote, function (error, stdout, stderr) {
        callback()
    })
});

/*
git推送
*/
gulp.task('push', function (callback) {
    exec('git push -u origin '+config[type].remote, function (error, stdout, stderr) {
        callback()
    })
});

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