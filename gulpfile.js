const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const log = require('fancy-log');
const purgecss = require('gulp-purgecss'); // For purging unused CSS

// Compile SCSS files to CSS
function buildStyles() {
  return src('./shinobi/**/*.scss') // Source path for SCSS files
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('css')); // Destination path for compiled CSS files
}

// Purge unused CSS
function purge() {
  return src('css/*.css')
    .pipe(
      purgecss({
        content: ['*.html'], // Paths to your HTML and JS files
      }),
    )
    .pipe(dest('css')); // Destination path for purged CSS files
}

// Watch for changes in SCSS files
function watchTasks() {
  log('Watching for changes in SCSS files...');
  watch(['./shinobi/**/*.scss', '*.html'], buildStyles) // Watch all SCSS files in the source directory
    .on('change', function (path) {
      log('File ' + path + ' was changed, running buildStyles...');
    })
    .on('error', log.error); // Log errors
}

// Default task
exports.default = series(buildStyles, purge, watchTasks);
