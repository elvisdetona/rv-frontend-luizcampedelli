var gulp = require('gulp');
var $    = require('gulp-load-plugins')({
        pattern: '*'
    });

var sassPaths = [
  'bower_components/foundation-sites/scss'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      errLogToConsole: true,
      sourceComments: 'map',
      sourceMap: 'sass',
      outputStyle: 'expanded'
    })
    .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'))
    .pipe($.browserSync.stream());
});

gulp.task('server', function () {
    $.browserSync.init({
        server: {
            baseDir: './'
        },
        open: false
    });
    gulp.watch('scss/**/*.scss', ['sass'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
    gulp.watch('templates/**/*.html').on('change', $.browserSync.reload);
    gulp.watch('js/**/*.js').on('change', $.browserSync.reload);
});

gulp.task('build', function() {
    gulp.src('scss/app.scss')
        .pipe($.sass({
            includePaths: sassPaths,
            outputStyle: 'compressed'
        })
        .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['server']);
