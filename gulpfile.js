'use strict';

var  gulp = require('gulp'),
     lint = require('gulp-jshint'),
   concat = require('gulp-concat'),
   uglify = require('gulp-uglify'),
   rename = require('gulp-rename'),
     maps = require('gulp-sourcemaps'),
      del = require('del');

gulp.task('lint', function () {
        return gulp.src([
                'src/js/main.js', 
                'src/js/controllers.js', 
                'src/js/apodviewerctrl.js', 
                'src/js/services.js', 
                'src/js/apodservice.js'])
                .pipe(lint())
                .pipe(lint.reporter('default'));
});

gulp.task('concatScripts', function () {
        return gulp.src([
                'src/bower_components/angular/angular.js',
                'src/js/main.js',
                'src/js/controllers.js',
                'src/js/apodviewerctrl.js',
                'src/js/services.js',
                'src/js/apodservice.js',
                'src/js/filters.js',
                'src/js/trustedfilter.js'
                ])
                .pipe(maps.init())
                .pipe(concat('app.js'))
                .pipe(maps.write('./'))
                .pipe(gulp.dest('src/js'));
});

gulp.task('minifyScripts', ['concatScripts'], function () {
        return gulp.src('src/js/app.js')
                .pipe(uglify())
                .pipe(rename({
                        suffix: ".min",
                        extname: ".js"
                }))
                .pipe(gulp.dest('src/js'));

});

gulp.task('build', ['minifyScripts'], function () {
        return gulp.src(['src/js/app.min.js',
                'src/index.html'], { base: './src/' })
                .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
        gulp.src('src/bower_components/angular/angular.js')
                .pipe(gulp.dest('src/js'));
        gulp.watch('src/js/main.js', ['lint']);
        gulp.watch('src/controllers.js', ['lint']);
        gulp.watch('src/services.js', ['lint']);
        gulp.watch('src/apodviewerctrl.js', ['lint']);
        gulp.watch('src/apodservice.js', ['lint']);
});

gulp.task('default', function () {
        console.log("not yet defined");
});