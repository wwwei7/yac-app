/**
 * [gulp description]
 * @type {[type]}
 */
var gulp = require("gulp");
var gutil = require("gulp-util");
var del = require("del");
var rename = require('gulp-rename');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cached = require('gulp-cached');
var remember = require('gulp-remember');

var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

var connect = require('gulp-connect');
var rest = require('connect-rest');
var proxy = require('http-proxy-middleware');

// var mocks = require('./mocks');

/**
 * ----------------------------------------------------
 * source configuration
 * ----------------------------------------------------
 */

var src = {
  html: "src/html/*.html",                          // html 文件
  vendor: ["vendor/**/*", "bower_components/**/*"], // vendor 目录和 bower_components
  style: "src/style/*/*.less",                  // style 目录下所有 xx/index.less
  assets: "assets/**/*"                             // 图片等应用资源
};

var dist = {
  root: "dist/",
  html: "dist/",
  style: "dist/style",
  vendor: "dist/vendor",
  assets: "dist/assets"
};

var bin = {
  root: "bin/",
  html: "bin/",
  style: "bin/style",
  vendor: "bin/vendor",
  assets: "bin/assets"
};

var deploy =  {
  root: "../yac-webserver/client",
  html: "../yac-webserver/client",
  style: "../yac-webserver/client/style",
  vendor: "../yac-webserver/client/vendor",
  assets: "../yac-webserver/client/assets"  
}

/**
 * ----------------------------------------------------
 *  tasks
 * ----------------------------------------------------
 */

/**
 * clean build dir
 */
function clean(done) {
  del.sync(dist.root);
  done();
}

/**
 * [cleanBin description]
 * @return {[type]} [description]
 */
function cleanBin(done) {
  del.sync(bin.root);
  done();
}

/**
 * [cleanBin description]
 * @return {[type]} [description]
 */
function cleanDeploy(done) {
  del.sync(deploy.root, {force: true});
  done();
}

/**
 * [copyVendor description]
 * @return {[type]} [description]
 */
function copyVendor() {
  return gulp.src(src.vendor)
    .pipe(gulp.dest(dist.vendor));
}

/**
 * [copyAssets description]
 * @return {[type]} [description]
 */
function copyAssets() {
  return gulp.src(src.assets)
    .pipe(gulp.dest(dist.assets));
}

/**
 * [copyDist description]
 * @return {[type]} [description]
 */
function copyDist() {
  return gulp.src(dist.root + '**/*')
    .pipe(gulp.dest(bin.root));
}

/**
 * [copyDist description]
 * @return {[type]} [description]
 */
function copyDistDeploy() {
  return gulp.src(dist.root + '**/*')
    .pipe(gulp.dest(deploy.root));
}

/**
 * [html description]
 * @return {[type]} [description]
 */
function html() {
    return gulp.src(src.html)
      .pipe(gulp.dest(dist.html))
}

/**
 * [style description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
function style() {
    return gulp.src(src.style)
      .pipe(cached('style'))
      .pipe(less())
      .on('error', handleError)
      .pipe(autoprefixer({
        browsers: ['last 3 version']
      }))
      .pipe(gulp.dest(dist.style))
}

exports.style = style;

/**
 * [webpackProduction description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
function webpackProduction(done) {
  var config = Object.create(webpackConfig);
  config.plugins = config.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": { 
        NODE_ENV: JSON.stringify("production") 
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  webpack(config, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:production]", stats.toString({
      colors: true
    }));
    done();
  });
}


/**
 * [webpackDevelopment description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
var devConfig, devCompiler;

devConfig = Object.create(webpackConfig);
devConfig.devtool = "sourcemap";
devConfig.debug = true;
devCompiler = webpack(devConfig);

function webpackDevelopment(done) {
  devCompiler.run(function(err, stats) {
    if (err) {
      throw new gutil.PluginError("webpack:build-dev", err);
      return;
    }
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    done();
  });
}

/**
 * webpack develop server
 */
// devConfig.plugins = devConfig.plugins || []
// devConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
// function webpackDevelopmentServer(done) {
//   new WebpackDevServer(devCompiler, {
//    contentBase: dist.root,
//     lazy: false,
//     hot: true
//   }).listen(8080, 'localhost', function (err) {
//     if (err) throw new gutil.PluginError('webpack-dev-server', err)
//     gutil.log('[webpack-dev-server]', 'http://localhost:8080/')
//  reload();
//  done();
//   });
// }

/**
 * [connectServer description]
 * @return {[type]} [description]
 */
function connectServer(done) {
  connect.server({
      root: dist.root,
      port: 3111,
      livereload: true,
      middleware: function(connect, opt) {
        return [
          proxy('/api', {
            target: 'http://localhost:3000',
            changeOrigin:true
          }),
          proxy('/action', {
            target: 'http://localhost:3000',
            changeOrigin:true
          })
        ]
      }
  });
//   mocks(rest);
  done();
}

/**
 * [watch description]
 * @return {[type]} [description]
 */
function watch() {
  gulp.watch(src.html, html);
  gulp.watch("src/**/*.js", webpackDevelopment);
  gulp.watch("src/**/*.less", style);
  gulp.watch("dist/**/*").on('change', function(file) {
    gulp.src('dist/')
      .pipe(connect.reload());
  });
}

/**
 * default task
 */
gulp.task("default", gulp.series(
  clean, 
  gulp.parallel(copyAssets, copyVendor, html, style, webpackDevelopment), 
  connectServer, 
  watch
));

/** 
 * production build task
 */
gulp.task("build", gulp.series(
  clean, 
  gulp.parallel(copyAssets, copyVendor, html, style, webpackProduction), 
  cleanBin, 
  copyDist, 
  cleanDeploy,
  copyDistDeploy,
  function(done) {
    console.log('build success');
    done();
  }
));

/** 
 * production deply task
 * to yac-webserver 
 */
gulp.task("deploy", gulp.series(
  clean, 
  gulp.parallel(copyAssets, copyVendor, html, style, webpackProduction), 
  cleanDeploy, 
  copyDistDeploy, 
  function(done) {
    console.log('deploy success');
    done();
  }
));


/**
 * [handleError description]
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
function handleError(err) {
  if (err.message) {
    console.log(err.message)
  } else {
    console.log(err)
  }
  this.emit('end')
}

/**
 * [reload description]
 * @return {[type]} [description]
 */
function reload() {
  connect.reload();
}