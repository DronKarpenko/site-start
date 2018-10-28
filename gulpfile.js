var gulp         = require('gulp'),
	watch		 = require('gulp-watch'),
	sass         = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS     = require('gulp-clean-css'),
	rename       = require('gulp-rename'),
	concat       = require('gulp-concat'),
	browserSync  = require('browser-sync').create(),
	uglify       = require('gulp-uglify');


gulp.task('browser-sync', ['style'], function() {
	browserSync.init({
		server: {
				baseDir: "./app"
				},
		notify: false
	});
});

gulp.task('style', function () {
	return gulp.src('app/sass/main.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('watch', function () {
	gulp.watch('app/sass/*.sass', ['style']);
	gulp.watch('app/libs/**/*.js', ['scripts']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);