/*
 * tree-set.test.js - example of Tree Set unit test
 *
 * Copyright (C) 2016 Paolo Rovelli
 *
 * Author: Paolo Rovelli <paolorovelli@yahoo.it>
 */

'use strict';

var expect = require('chai').expect;
var Set = require('../src/tree-set.js');

describe('unit tests - tree set', function() {

    var s = null;
    var e = ['paolo', 'love', 'valeria', ':', 'i', 'mimmi', 'bimbi'];

    it('should create a new set', function() {
        s = new Set();
        expect(s).to.not.equal(null);
    });

    it('should be an empty set', function() {
        expect(s.isEmpty()).to.equal(true);
        expect(s.size()).to.equal(0);
    });

    it('should add an element to the set', function() {
        expect(s.add(e[0])).to.equal(true);
        expect(s.isEmpty()).to.equal(false);
        expect(s.size()).to.equal(1);
    });

});

