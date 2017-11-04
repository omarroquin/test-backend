const gulp = require('gulp')
const rename = require('gulp-rename')
const babel = require('babelify')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const watchify = require('watchify')

function compile (watch) {
  var bundle = watchify(browserify('./src/index.js'))

  function rebundle () {
    bundle
      .transform(babel, {presets: ['es2015']})
      .bundle()
      .pipe(source('index.js'))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('public/javascripts'))
  }

  if (watch) {
    bundle.on('update', function () {
      console.log('-> Bundling...')
      rebundle()
    })
  }

  rebundle()
}

gulp.task('build', function () {
  return compile()
})

gulp.task('watch', function () {
  return compile(true)
})

gulp.task('default', ['build'])
