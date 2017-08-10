var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var config = {
  source: './src/',
  dist:'./public/'
};

var paths = {
  assets: "/assets/",
  html: "**/*.html",
  sass: 'scss/*.scss',
  mainSass: 'scss/main.scss',
  js: 'js/index.js'
};

var sources = {
  assets: config.source + paths.assets,
  html: config.source + paths.html,
  sass: config.source + paths.sass,
  js: config.source + paths.js,
};

gulp.task('html', ()=> {
  gulp.src(sources.html)
  .pipe(gulp.dest(config.dist));
});

gulp.task("sass", function() {
  gulp.src(sources.sass)
    .pipe(sass({
      outputStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(gulp.dest(config.dist + "css"));
});

gulp.task('js', function() {
  gulp.src(sources.js)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(config.dist + "js"));
});
