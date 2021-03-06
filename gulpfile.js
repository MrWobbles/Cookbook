// VARIABLES
var gulp = require('gulp');
var gutil = require('gulp-util');
var merge = require('merge-stream');

var bower = require('gulp-bower');
var filter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var del = require('del');

var fs = require('fs');

var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var cleanCSS = require('gulp-clean-css');
var npmCleanCSS = require('clean-css');
var postcss = require('gulp-postcss');
var pxtorem = require('postcss-pxtorem');

var wait = require('gulp-wait');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');

var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');

var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var prod = !!(argv.prod);

// ASSET FOLDER PATHS
var paths = {
  images: {
    src: './assets/src/images/',
    dest: './assets/dist/images/',
  },
  scripts: {
    src: './assets/src/js/',
    dest: './assets/dist/js/'
  },
  styles: {
    src: './assets/src/scss/',
    dest: './assets/dist/css/'
  }
};

// ASSET FILES
var files = {
  // IMAGES
  images: paths.images.src + '/',
  // STYLES
  main: paths.styles.src + '/',
  // SCRIPTS
  scriptsMain: [
    paths.scripts.src + 'main.js'
  ]
};

// VIEWS FILES
var views = {
  src: '../../views/**/',
  dest: '../../views/'
};

// BOWER COMPONENTS
var framework = {
  bourbon: {
    src: 'bower_components/bourbon/app/assets/stylesheets/**/*',
    dest: paths.styles.src + 'vendor/bourbon/',
  }
};

var siteURL = 'http://wsstarter.local';

// BROWSERSYNC
gulp.task('browser-sync', function () {
  var browserSyncFiles = ['*.{html,shtml,php,aspx,ascx,asp,inc}', '!assets/dist/css/critical/*.css', 'assets/dist/css/**/*.css', 'assets/dist/js/**/*.js', 'assets/dist/images/**/*.{png,gif,jpg,svg}'];
  browserSync.init(browserSyncFiles, {
    proxy: siteURL
  });
});

var processors = [
  autoprefixer({
    browsers: ['last 3 versions', 'IOS 8'],
    remove: false
  }),
  pxtorem({
    rootValue: 16,
    unitPrecision: 5,
    propList: ['*'],
    replace: false
  })
];

// VIEW STYLES
gulp.task('viewstyles', function () {
  return gulp.src(views.src + '*.css')
    .pipe(concat('views.css'))
    .pipe(wait(500))
    .pipe(sass().on('error', sass.logError))
    .on('error', notify.onError({
      message: 'Styles compiling failed'
    }))
    .pipe(postcss(processors))
    .pipe(cleanCSS())
    .pipe(rename({ extname: '.scss' }))
    .pipe(gulp.dest(views.dest))
    .pipe(notify({
      message: 'views css compiled',
      onLast: true
    }));
});

// STYLES
gulp.task('styles', function () {
  return gulp.src(files.main + '*.scss')
    .pipe(wait(500))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .on('error', notify.onError({
      message: 'styles failed'
    }))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
});

// CLEAN CSS
gulp.task('clean-css', gulp.series('styles'), function () {
  return gulp.src(paths.styles.dest + '*.min.css', { read: false })
    .pipe(clean());
});

// COMPRESS STYLES
gulp.task('compress-css', gulp.series('clean-css'), function () {
  return gulp.src(paths.styles.dest + '*.css')
    .pipe(sass().on('error', sass.logError))
    .on('error', notify.onError({
      message: 'css compression failed'
    }))
    .pipe(cleanCSS({
      level: {
        2: {
          specialComments: 0,
          mergeSemantically: true,
          removeUnusedAtRules: false,
          restructureRules: true
        }
      },
      compatibility: '*',
      advanced: true,
      ieBangHack: true,
      ieFilters: true,
      iePrefixHack: true,
      ieSuffixHack: true,
      sourceMap: true
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(notify({
      message: 'css compressed',
      onLast: true
    }));
});

// VIEW JS
gulp.task('viewscripts', function () {
  return gulp.src(views.src + '*.js')
    .pipe(concat('views.js'))
    .pipe(uglify().on('error', notify.onError({
      message: 'views js failed'
    })))
    .pipe(gulp.dest(views.dest))
    .pipe(notify({
      message: 'views js compiled',
      onLast: true
    }));
});

// JS LINT
gulp.task('jslint', function () {
  var main = gulp.src(paths.scripts.src + 'main.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .on('error', notify.onError({
      message: 'main.js linting failed'
    }));
  return merge(main);
});

// SCRIPTS
gulp.task('scripts', gulp.series('jslint'), function () {
  var main = gulp.src(files.scriptsMain)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));

  return merge(main);
});

// CLEAN JS
gulp.task('clean-js', gulp.series('scripts'), function () {
  return gulp.src(paths.scripts.dest + '*.min.js', { read: false })
    .pipe(clean());
});

// COMPRESS SCRIPTS
gulp.task('compress-scripts', gulp.series('clean-js'), function () {
  return gulp.src(paths.scripts.dest + '*.js')
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(notify({
      message: 'js compressed',
      onLast: true
    }));
});

// IMAGES
gulp.task('images', function () {
  return gulp.src(paths.images.src + '**/*')
    .pipe(wait(1500))
    .pipe(newer(paths.images.dest))
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      })
    ]))
    .pipe(gulp.dest(paths.images.dest))
    .on('error', gutil.log)
    .pipe(notify({
      message: 'images optimized',
      onLast: true
    }));
});

// DEFAULT TASK
gulp.task('default', gulp.series('compress-css', 'compress-scripts'), function () {
  gulp.watch(views.src + '**/*.css').on('change', gulp.series('viewstyles')),
    gulp.watch(paths.styles.src + '**/*.scss').on('change', gulp.series('compress-css')),
    gulp.watch([views.src + '**/*.js', '!../../views/views.js']).on('change', gulp.series('viewscripts')),
    gulp.watch(paths.scripts.src + '**/*.js').on('change', gulp.series('compress-scripts'));
  return;
});

gulp.task('watch', function () {
  gulp.series('compress-css', 'compress-scripts');
  gulp.watch(paths.styles.src + '**/*.scss').on('change', gulp.series('compress-css')),
    gulp.watch(paths.styles.src + '**/*.scss').on('change', gulp.series('compress-css')),
    gulp.watch([views.src + '**/*.js', '!../../views/views.js']).on('change', gulp.series('viewscripts')),
    gulp.watch(paths.scripts.src + '**/*.js').on('change', gulp.series('compress-scripts'));
  return;
});


// BROWSER SYNC TASK
gulp.task('sync', gulp.series('compress-css', 'compress-scripts', 'images', 'browser-sync'), function () {
  gulp.watch(views.src + '**/*.css').on('change', gulp.series('viewstyles')),
    gulp.watch(paths.styles.src + '**/*.scss').on('change', gulp.series('compress-css')),
    gulp.watch([views.src + '**/*.js', '!../../views/views.js']).on('change', gulp.series('viewscripts')),
    gulp.watch(paths.scripts.src + '**/*.js').on('change', gulp.series('compress-scripts')),
    gulp.watch(paths.images.src + '**/*').on('change', gulp.series('images'));
  return
});

// INSTALL BOWER DEPENDENCIES
gulp.task('bower-install', function () {
  return bower();
});

// MOVE BOWER MAIN FILES
var filterByExtension = function (extension) {
  return filter(function (file) {
    return file.path.match(new RegExp('.' + extension + '$'));
  }, {
    restore: true
  });
};
gulp.task('bower-single-files', gulp.series('bower-install'), function () {
  var mainFiles = mainBowerFiles();
  if (!mainFiles.length) {
    return;
  }
  var jsFilter = filterByExtension('js');
  return gulp.src(mainFiles)
    .pipe(jsFilter)
    .pipe(gulp.dest(paths.scripts.src + 'vendor/'))
    .pipe(jsFilter.restore)
    .pipe(filterByExtension('css'))
    .pipe(gulp.dest(paths.styles.src + 'vendor/'))
    .pipe(jsFilter.restore)
    .pipe(filterByExtension('css'))
    .pipe(gulp.dest(paths.styles.src + 'vendor/'));
});

// REMOVE BOWER COMPONENTS FOLDER
gulp.task('clean-bower', gulp.series('bower-single-files'), function () {
  del('bower_components/');
});

gulp.task('bower', gulp.series('clean-bower'));