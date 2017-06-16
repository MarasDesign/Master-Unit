var gulp = require('gulp');
var panini = require('panini');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('sass', function() {
     return gulp.src('src/assets/style/*')
         .pipe(sass())
         .pipe(gulp.dest('build/assets/style/'))
         .pipe(browserSync.stream())
 });

gulp.task('html', function() {
  gulp.src('src/pages/**/*.html')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layout/',
      partials: 'src/partials/',
      helpers: 'src/helpers/',
      data: 'src/data/'
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('browserSync', function() {
   browserSync.init({
      server: {
         baseDir: 'build/'
      }
   });
})

gulp.task('watch', function() {
     gulp.watch('src/assets/style/*', ['sass']).on('change', browserSync.reload);
     gulp.watch('src/**/*.html', [panini.refresh]);
     gulp.watch('build/*').on('change', browserSync.reload);
     //return gulp.watch(['pages:reset','pages']);
 });

gulp.task('default', ['sass', 'html', 'watch', 'browserSync']);

