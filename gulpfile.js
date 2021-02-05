/*jshint esversion: 6 */

var gulp = require('gulp'),
	rename = require('gulp-rename'),
	bump = require('gulp-bump'),
	gulpif = require("gulp-if"),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	gzip = require('gulp-gzip'),
	header = require('gulp-header'),
	replace = require('gulp-replace');

var DIST = "dist";
var SRC = "src";
var PROD = false;

var banner = ['/**',
	' * @preserve <%= pkg.name %> - <%= pkg.description %>',
	' * ',
	' * @version v<%= pkg.version %>',
	' * @link <%= pkg.homepage %>',
	' * @author <%= pkg.author %>',
	' * @license <%= pkg.license %>',
	' */',
	''].join('\n');


gulp.task("js", function () {

	var filename = "cookie-warn.js";
	var packageJson = require('./package.json');

	return gulp.src([
		SRC + "/*.js"
	])		
		.pipe(concat(filename))
		.pipe(header(banner, { pkg: packageJson }))
		.pipe(gulp.dest(DIST));		

});


gulp.task("js-min", function () {

	var filename = "cookie-warn.js";

	var packageJson = require('./package.json');

	return gulp.src([
		DIST + "/" + filename,
	])
		.pipe(concat(filename))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(header(banner, { pkg: packageJson }))
		.pipe(gulp.dest(DIST))
		.pipe(gzip({ append: true }))
		.pipe(gulp.dest(DIST));

});


gulp.task("watch", function () {

	gulp.watch(SRC + "/*.js", gulp.series("js"));

});


gulp.task('bump', function () {

	return gulp.src(['./package.json'])
		.pipe(bump({ type: 'patch', indent: 4 }))
		.pipe(gulp.dest('./'));

});


gulp.task('version', function () {

	var packageJson = require('./package.json');

	return gulp.src([
		SRC + '/cookie-warn.js',
	])
		.pipe(replace(/@version\s\d+\.\d+\.\d+/g, '@version ' + packageJson.version))
		.pipe(gulp.dest(SRC));

});

gulp.task('default', gulp.series(
	function (cb) {
		PROD = false;
		cb();
	},
	"js",
	"version"
));

gulp.task('prod', gulp.series(
	function (cb) {
		PROD = true;
		cb();
	},
	"bump",
	"js",
	"js-min",
	"version"
));


