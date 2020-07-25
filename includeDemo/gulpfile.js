'use strict';
 
var gulp = require('gulp');
var fileinclude = require('gulp-file-include');



gulp.task('fileinclude',function(){
	return gulp.src('src/**.html')
	.pipe(fileinclude({
		prefix:'@@',
		basepath:'@file'
	}))
	.pipe(gulp.dest('src/dist'));
})

 
gulp.task('sass:watch', function () {
  gulp.watch('src/**.html', gulp.series('fileinclude'));
});

gulp.task("all",gulp.series('fileinclude','sass:watch'));