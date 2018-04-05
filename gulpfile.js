var gulp         = require('gulp'),
	rename       = require('gulp-rename'),
	gulpif       = require("gulp-if"),
	debug        = require("gulp-debug"),
	order        = require("gulp-order"),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglify'),
	runSequence  = require('run-sequence'),
	gzip         = require('gulp-gzip'),
	gutil        = require('gulp-util');


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
	var header = require('gulp-header');
	var package = require('./package.json');

	return gulp.src([
		SRC + "/*.js"
	])
		.pipe(order([
			"cookie-warn.js"
		], {
			base: SRC
		}))
		.pipe(concat(filename))
		.pipe(header(banner, {pkg: package}))
		.pipe(gulp.dest(DIST))
		.pipe(debug());

});


gulp.task("js-min", function () {

	var filename = "cookie-warn.js";
	var header = require('gulp-header');
	var package = require('./package.json');

	return gulp.src([
		DIST + "/" + filename,
	])
		.pipe(concat(filename))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify().on('error', function (err) {
			gutil.log(gutil.colors.red('[Error]'), err.toString());
			this.emit('end');
		}))
		.pipe(header(banner, {pkg: package}))
		.pipe(gulp.dest(DIST))
		.pipe(debug())
		.pipe(gzip({append: true}))
		.pipe(gulp.dest(DIST))
		.pipe(debug());

});


gulp.task("watch", function () {

	var watch = require("gulp-watch");
	var batch = require("gulp-batch");

	watch(SRC + "/*.js", batch(function (events, done) {
		gulp.start("js", done);
	}));

});


gulp.task('bump', function () {

	var bump = require('gulp-bump');

	return gulp.src(['./package.json'])
		.pipe(bump({type: 'patch', indent: 4}))
		.pipe(gulp.dest('./'));
});


gulp.task('version', function (callback) {

	var package = require('./package.json');
	var replace = require('gulp-replace');

	//@version 2.0.0

	return gulp.src([
		SRC + '/cookie-warn.js',
	])
		.pipe(replace(/@version\s\d+\.\d+\.\d+/g, '@version ' + package.version))
		.pipe(gulp.dest(SRC))
		.pipe(debug());

});

gulp.task('dev', function (callback) {

	prod = false;

	runSequence(
		["js"],
		["version"],
		callback
	);

});

gulp.task('prod', function (callback) {

	prod = true;

	runSequence(
		["bump"],
		["js-min"],
		["version"],
		callback
	);
	
});


