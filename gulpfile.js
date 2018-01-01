const gulp         = require('gulp');
const browserSync  = require('browser-sync');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanHTML    = require('gulp-htmlmin');
const cleanCSS     = require('gulp-clean-css');
const notify       = require("gulp-notify");

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        proxy: "localhost:8888/CleanGulp/src/"
    });

    gulp.watch("./src/scss/*.scss", ['sass']);
    gulp.watch("./src/*.html").on('change', browserSync.reload);
    gulp.watch("./src/*.php").on('change', browserSync.reload);
});

gulp.task('minHTML' , function(){
	return gulp.src('src/*.html')
		.pipe(cleanHTML({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('build/'));
});

gulp.task('minCSS' , function(){
	return gulp.src('src/css/*.css')
		.pipe(cleanCSS())
		.pipe(gulp.dest('build/css/'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .on('error', notify.onError())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            //cascade: false
        }))
        //.pipe(cleanCSS())
        .pipe(gulp.dest("./src/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);