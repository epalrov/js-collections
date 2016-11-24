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
var mocha = require('gulp-mocha');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var zip = require('gulp-zip');

var browserify = require('browserify');
var collapse = require('bundle-collapser/plugin');
var source = require('vinyl-source-stream');
var merge = require('merge-stream');
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

    var bundled = browserify(topDir + pkg.main, {standalone: 'Collections'})
        .plugin(collapse)
        .bundle()
        .pipe(source('Collections.bundle.js'))
        .pipe(streamify(insert.prepend(header)))
        .pipe(gulp.dest(outDir))
        .pipe(streamify(uglify()))
        .pipe(streamify(insert.prepend(header)))
        .pipe(streamify(concat('Collections.bundle.min.js')))
        .pipe(gulp.dest(outDir));

    var nonBundled = browserify(topDir + pkg.main, {standalone: 'Collections'})
        .plugin(collapse)
        .bundle()
        .pipe(source('Collections.js'))
        .pipe(streamify(insert.prepend(header)))
        .pipe(gulp.dest(outDir))
        .pipe(streamify(uglify()))
        .pipe(streamify(insert.prepend(header)))
        .pipe(streamify(concat('Collections.min.js')))
        .pipe(gulp.dest(outDir));

    return merge(bundled, nonBundled);
}

function packageTask() {
    var files = [
        outDir + '**/*.js'
    ];

    return gulp.src(files)
        .pipe(zip('Collections.js.zip'))
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
            'Collections',
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

function unitTask() {
    return gulp.src([testDir + '**/*.js'], {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .on('error', util.log);
}

function watchTask() {
    var files = [
        topDir + '*.js',
        srcDir + '**/*.js',
        testDir + '**/*.js'
    ];
    return gulp.watch(files, ['lint', 'unit']);
}

gulp.task('build', buildTask);
gulp.task('package', packageTask);
gulp.task('lint', lintTask);
gulp.task('unit', unitTask);
gulp.task('watch', watchTask);

gulp.task('test', ['lint', 'unit']);
gulp.task('all', ['lint', 'unit', 'build', 'package']);
gulp.task('default', ['lint', 'unit', 'watch']);

