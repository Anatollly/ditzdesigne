'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const concat = require('gulp-concat');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const newer = require('gulp-newer');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const mqpacker = require('css-mqpacker');
const remember = require('gulp-remember');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const webpack = require('gulp-webpack');
const gcmq = require('gulp-group-css-media-queries');
const nodemon = require('gulp-nodemon');

console.log(gulp);
// const watch = require('gulp-watch');
// const chokidar = require('chokidar');

// const livereload = require('gulp-livereload');

// gulp.watch = watch;

// require('babel-register');

console.log(gulp);

gulp.task('styles', function() {
  return gulp.src('frontend/styles/main.styl')
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
      }))
    .pipe(gcmq())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/frontend/css/'))
});

gulp.task('scripts', function () {
  return gulp.src('./frontend/js/main.js')
    .pipe(plumber())
    .pipe(webpack({
      devtool: 'source-map',
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader' }
        ]
      },
      output: {
          filename: "main.js"
      }
    }))
    .pipe(gulp.dest('build/frontend/js/'));
});

gulp.task('clean', function() {
  return del(['build/*']);
});

gulp.task('font', function() {
  return gulp.src('frontend/fonts/*.*', {since: gulp.lastRun('font')})
    .pipe(newer('build/frontend/fonts/'))
    .pipe(gulp.dest('build/frontend/fonts/'));
});

gulp.task('html', function() {
  return gulp.src('frontend/index.html', {since: gulp.lastRun('html')})
    .pipe(newer('build'))
    .pipe(gulp.dest('build'));
});

gulp.task('img', function() {
  return gulp.src('frontend/img/**/*.*', {since: gulp.lastRun('img')})
    .pipe(newer('build/frontend/img/'))
    .pipe(gulp.dest('build/frontend/img/'));
});

gulp.task('delPhoto', function() {
  return del(['build/photo/*'])
})

gulp.task('copyPhoto', function() {
  return gulp.src('photo/**')
    .pipe(newer('build/photo/'))
    .pipe(gulp.dest('build/photo/'));
});

gulp.task('photo', gulp.series('delPhoto', 'copyPhoto'));

gulp.task('appServer', function() {
  return gulp.src('server/**/*.*')
    .pipe(gulp.dest('build/server/'));
});

gulp.task('build', gulp.series('clean', 'font', 'html', 'styles', 'scripts', 'img', 'copyPhoto', 'appServer'));

gulp.task('watch', function() {
  gulp.watch('frontend/styles/**/*.*', gulp.series('styles'));
  gulp.watch('frontend/js/**/*.*', gulp.series('scripts'));
  gulp.watch('frontend/*.html', gulp.series('html'));
  gulp.watch('server/**/*.*', gulp.series('appServer'));
  gulp.watch('photo/**/*.*', { delay: 5000 }, gulp.series('photo'));
});

gulp.task('serve', function () {
  browserSync.init({
    server: './build',
    notify: false,
    open: true,
    port: 3501,
    ui: false
  });

  browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('nodemon', function () {

  nodemon({
    script: 'build/server/app.js',
    watch: 'build/*',
    ext: 'js css html'
  });
});

gulp.task('dev',
  gulp.series('build',
    gulp.parallel('watch', 'serve')));

gulp.task('server',
  gulp.series('build',
    gulp.parallel('watch', 'nodemon')));
