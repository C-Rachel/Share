'use strict';
 
var gulp = require('gulp');
var ejs = require('gulp-ejs');
//var rename = require('gulp-rename')


//settings was removed.不能通过设置setting来修改拓展名
//如果要修改拓展名*.ejs导出*.html 则需要gulp-rename 
gulp.task('ejs',function(){
	return gulp.src('html/**.ejs')
		.pipe(ejs())
		//.pipe(rename({extname:'.html'}))
	.pipe(gulp.dest('dist'));
})
