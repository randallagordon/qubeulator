"use strict";
var fs = require("fs");
var path = require("path");
var url = require("url");
var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var del = require("del");
var mkdirp = require("mkdirp");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var react = require("gulp-react");
var jshint = require("gulp-jshint");
var jsxcs = require("gulp-jsxcs");
var lab = require("gulp-lab");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");

// BrowserSync is an optional dependency to avoid compiling ws on Travis builds
try {
  var browserSync = require("browser-sync");
  var reload = browserSync.reload;
} catch (e) {
}

var paths = {
  css: ["src/css/**/*.scss"],
  js: ["src/js/**/*.js*", "node_modules/qubeulator-components/**/*.js*"],
  test: ["test/**/*.js*", "src/js/**/*.js*", "node_modules/qubeulator-components/**/*.js*"],
  index: "index.html",
  entrypoint: ["./src/js/app.jsx"],
  build: "./build"
};

var handleError = function(err) {
  notify.onError({
    message: "<%= error.message %>"
  }).apply(this, arguments);

  this.emit("end");
};

gulp.task("serve", ["watch", "css-debug", "js-debug", "copy-debug"], function() {
  browserSync({
    files: [],
    port: 8080,
    open: false,
    server: {
      baseDir: paths.build,
      middleware: [
        function singlePageAppRedirect(req, res, next) {
          var fileName = url.parse(req.url);
          fileName = fileName.href.split(fileName.search).join("");
          var fileExists = fs.existsSync(path.resolve(__dirname, paths.build) + fileName);
          if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
            req.url = "/index.html";
          }
          return next();
        },
        require("compression")()
      ]
    }
  });
});

gulp.task("test", function() {
  gulp.src("test")
    .pipe(lab());
});

gulp.task("jscs", function() {
  gulp.src(paths.js)
    .pipe(jsxcs());
});

gulp.task("lint", function() {
  gulp.src(paths.js)
    .pipe(jshint(".jshintrc"))
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(jshint.reporter("fail"));
});

gulp.task("clean-css", function(done) {
  del([paths.build + "/css/*"], done);
  mkdirp(paths.build + "/css");
});

gulp.task("css-debug", ["clean-css"], function() {
  return gulp.src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", handleerror)
    .pipe(sourcemaps.write({ sourceroot: "/src/css" }))
    .pipe(gulp.dest(paths.build + "/css"))
    .pipe(reload({stream:true}));
});

gulp.task("css-build", ["clean-css"], function() {
  return gulp.src(paths.css)
    .pipe(sass())
    .pipe(gulp.dest(paths.build + "/css"));
});

gulp.task("clean-js", function(done) {
  del([paths.build + "/js/*"], done);
  mkdirp(paths.build + "/js");
});

gulp.task("js-debug", ["clean-js"], function() {
  browserify({
    entries: paths.entrypoint,
    debug: true
  })
    .transform(reactify)
    .bundle()
    .on("error", handleError)
    .pipe(source("js/bundle.js"))
    //.pipe(buffer())
    //.pipe(sourcemaps.init({ loadMaps: true }))
    //.pipe(uglify())
    //.pipe(sourcemaps.write({ sourceRoot: ".." }))
    .pipe(gulp.dest(paths.build))
    .pipe(reload({stream:true}));
});

gulp.task("js-build", ["clean-js"], function() {
  browserify({
    entries: paths.entrypoint,
  })
    .transform(reactify)
    .bundle()
    .on("error", handleError)
    .pipe(source("js/bundle.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.build))
});

gulp.task("clean-copy", function(done) {
  del([paths.build + "/" + paths.index], done);
});

gulp.task("copy-debug", ["clean-copy"], function () {
  gulp.src(paths.index)
    .pipe(gulp.dest(paths.build))
    .pipe(reload({stream:true}));
});

gulp.task("copy-build", ["clean-copy"], function () {
  gulp.src(paths.index)
    .pipe(gulp.dest(paths.build));
});

gulp.task("watch", function() {
  gulp.watch(paths.css, ["css-debug"]);
  gulp.watch(paths.js, ["js-debug"]);
  gulp.watch(paths.index, ["copy-debug"]);
});

gulp.task("watch-test", ["test"], function() {
  gulp.watch(paths.test, ["test"]);
});

gulp.task("build", ["jscs", "lint", "test", "css-build", "js-build", "copy-build"]);
gulp.task("ci", ["jscs", "lint", "test"]);
gulp.task("default", ["watch", "css-debug", "js-debug", "copy-debug"]);
