var gulp = require('gulp');

// Grab js files from bower_components and add them to public/vendor
gulp.task('chartjs', function() {
    return gulp.src('bower_components/Chart.js/dist/Chart.min.js')
      .pipe(gulp.dest('public/vendor/chartjs'));
});

// Default Task
gulp.task('default', ['chartjs']);