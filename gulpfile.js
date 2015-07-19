'use strict';

var gulp = require('gulp'),
		      lint = require('gulp-jshint'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename'),
          maps = require('gulp-sourcemaps'),
           del = require('del');

gulp.task('lint', function() {
  return gulp.src('./src/js/main.js')
    .pipe(lint())
    .pipe(lint.reporter('default'));
});