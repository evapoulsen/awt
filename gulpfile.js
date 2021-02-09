//Import the npm packages
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// Sass Task
function scssTask(){
    return src('./css/**/*.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([cssnano()]))
        .pipe(dest('dist', { sourcemaps: '.' }));
  }

// JavaScript Task
function jsTask(){
    return src('./js/**/*.js', { sourcemaps: true })
      .pipe(terser())
      .pipe(dest('dist', { sourcemaps: '.' }));
  }

  //Start Browser-sync
function browsersyncServe(cb){
browsersync.init({
    server: {
    baseDir: '.'
    }    
});
cb();
}

//Reload the server
function browsersyncReload(cb){
    browsersync.reload();
    cb();
  }

// Default Gulp Task
exports.default = series(
    scssTask,
    jsTask,
    browsersyncServe,
    watchTask
  );

// Watch Task
function watchTask(){
    watch('*.html', browsersyncReload);
    watch(['./**/*.scss', './**/*.js'], series(scssTask, jsTask, browsersyncReload));
  }