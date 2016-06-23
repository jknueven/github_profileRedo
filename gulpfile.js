'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({
      stream: true
    })
	)});

gulp.task('lint', function() {
  return gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})
 
gulp.task('watch',['browserSync','sass'], function () {
  gulp.watch(['./sass/*.scss','./js/*.js','./*.html'], ['sass','lint']);
});