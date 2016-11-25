/*
 * gulpfile.js - buildfile for js-collections
 *
 * Copyright (C) 2016 Paolo Rovelli
 *
 * Author: Paolo Rovelli <paolorovelli@yahoo.it>
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var insert = require('gulp-insert');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');

var browserify = require('browserify');
var collapse = require('bundle-collapser/plugin');
var source = require('vinyl-source-stream');

var pkg = require('./package.json');

var topDir = './';
var srcDir = './src/';
var outDir = './dist/';
var testDir = './test/';

function buildTask() {
    var header = '' +
        '/*\n' +
        ' * ' + pkg.name + ' v' + pkg.version + '\n' +
        ' *\n' +
        ' * ' + pkg.description + '\n' +
        ' *\n' +
        ' * Copyright (C) 2016 ' + pkg.author + '\n' +
        ' */\n\n';

    return browserify(topDir + pkg.main, {standalone: 'js-collections'})
        .plugin(collapse)
        .bundle()
        .pipe(source('js-collections.js'))
        .pipe(streamify(insert.prepend(header)))
        .pipe(gulp.dest(outDir))
        .pipe(streamify(uglify()))
        .pipe(streamify(insert.prepend(header)))
        .pipe(streamify(concat('js-collections.min.js')))
        .pipe(gulp.dest(outDir));
}

function packageTask() {
    var files = [
        outDir + '**/*.js'
    ];

    return gulp.src(files)
        .pipe(zip('js-collections.js.zip'))
        .pipe(gulp.dest(outDir));
}

function lintTask() {
    var files = [
        topDir + '*.js',
        srcDir + '**/*.js',
        testDir + '**/*.js'
    ];

    var options = {
        globals: [
            'afterAll',
            'afterEach',
            'beforeAll',
            'beforeEach',
            'describe',
            'expect',
            'it'
        ]
    };

    return gulp.src(files)
        .pipe(eslint(options))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function unitTestTask() {
    return gulp.src([srcDir + '**/*.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function() {
            return gulp.src([testDir + '**/*.js'], {read: false})
                .pipe(mocha({reporter: 'spec'}))
                .pipe(istanbul.writeReports())
                .pipe(istanbul.enforceThresholds({thresholds: {global: 75}}));
        });
}

function watchTask() {
    var files = [
        topDir + '*.js',
        srcDir + '**/*.js',
        testDir + '**/*.js'
    ];
    return gulp.watch(files, ['lint', 'unit-test', 'build']);
}

gulp.task('lint', lintTask);
gulp.task('unit-test', ['lint'], unitTestTask);
gulp.task('build', ['unit-test'], buildTask);
gulp.task('package', ['build'], packageTask);
gulp.task('watch', watchTask);

gulp.task('test', ['lint', 'unit-test']);
gulp.task('default', ['lint', 'unit-test', 'build', 'package']);

