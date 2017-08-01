var gulp = require('gulp');
var sass = require('gulp-sass');

var config = {
  source: './src/',
  dist:'./public/'
};

var paths = {
  assets: "/assets/",
  html: "**/*.html",
  sass: 'scss/*.scss',
  mainSass: 'scss/main.scss',
};

var sources = {
  assets: config.source + paths.assets,
  html: config.source + paths.html,
  sass: config.source + paths.sass,
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
