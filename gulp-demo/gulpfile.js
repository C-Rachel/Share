var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var htmlreplace = require('gulp-html-replace');
var uglify = require('gulp-uglify');


// 创建任务（执行任务）
// 目的：编译sass文件
gulp.task('buildSass', function () {
  // 查找需要编译的文件
  gulp.src('src/sass/*.scss')
    .pipe(sourcemaps.init())
    // 编译scss文件
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(sourcemaps.write("."))
    // 输出文件
    .pipe(gulp.dest('src/css'))

});

// 监听sass文件
gulp.task('jtSass', function () {
  // 监听文件，当文件有修改时，执行buildSass任务
  gulp.watch('src/sass/*.scss', ['buildSass']);
})

/**
 * 合并并优化css
 */
gulp.task('css', function () {
  var processors = [
    //自动添加兼容前缀
    autoprefixer({
      browsers: ['> 0.5%', 'IE 8']
    }),
    //优化css结构
    cssnano({
      safe: false,
      autoprefixer: false,
    }),
  ];
  return gulp.src([
      "./src/css/*.css"
    ])
    .pipe(sourcemaps.init({
      largeFile: true,
      loadMaps: true
    }))    
    .pipe(concat("main.min.css"))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('./dist/css/'));
});

/**
 * 其他静态资源
 */
gulp.task("asset", function () {
  gulp.src([
      './src/fonts/**/*'
    ])
    .pipe(gulp.dest('./dist/fonts/'));
  return gulp.src([
      './src/img/**/*'
    ])
    .pipe(gulp.dest('./dist/img/'));
});
/**
 * 编译HTML
 */
gulp.task("html", function () {
  return gulp.src(['./src/*.html'])
    .pipe(htmlreplace({
      'css': 'css/main.min.css',
      'js': 'js/main.min.js'
    }))
    .pipe(gulp.dest('./dist/'));
});

/**
 * 合并所有的JS
 */
gulp.task("js", function () {
  return gulp.src(['./src/js/*.js'])
    .pipe(sourcemaps.init({
      loadMaps: true,
      largeFile: true,
    }))
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./dist/js/'));
});

/**
 * 默认task，编译整个项目
 */
gulp.task("all", ["asset", "css", "js", "html"]);



