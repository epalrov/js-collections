/*
 * linked-list.test.js - example of Linked List unit test
 *
 * Copyright (C) 2016 Paolo Rovelli
 *
 * Author: Paolo Rovelli <paolorovelli@yahoo.it>
 */

'use strict';

var expect = require('chai').expect;
var List = require('../src/linked-list.js');

describe('unit tests - linked list', function() {

    var l = null;
    var e = ['paolo', 'love', 'valeria', ':', 'i', 'mimmi', 'bimbi'];

    it('should create a new list', function() {
        l = new List();
        expect(l).to.not.equal(null);
    });

    it('should be an empty list', function() {
        expect(l.isEmpty()).to.equal(true);
        expect(l.size()).to.equal(0);
    });

    it('should add an element to the list', function() {
        expect(l.add(e[0])).to.equal(true);
        expect(l.isEmpty()).to.equal(false);
        expect(l.size()).to.equal(1);
    });

    it('should retrieve the element from the list', function() {
        expect(l.get(0)).to.equal(e[0]);
    });

    it('should modify the element of the list', function() {
        expect(l.set(0, e[1])).to.equal(e[0]);
    });

    it('should remove the element from the list', function() {
        expect(l.remove(0)).to.equal(e[1]);
        expect(l.isEmpty()).to.equal(true);
        expect(l.size()).to.equal(0);
    });

    it('should add many elements to the list', function() {
        e.forEach(function(v, i) {
            expect(l.add(v)).to.equal(true);
            expect(l.isEmpty()).to.equal(false);
            expect(l.size()).to.equal(i+1);
        });
    });

    it('should retrieve each element of the list', function() {
        e.forEach(function(v, i) {
            expect(l.get(i)).to.equal(v);
        });
    });

    it('should modify each element of the list', function() {
        e.forEach(function(v, i) {
            expect(l.set(i, 'love')).to.equal(v);
        });
    });

    it('should clear the whole list', function() {
        l.clear();
        expect(l.isEmpty()).to.equal(true);
        expect(l.size()).to.equal(0);
    });

    it('should throw out of range exceptions', function() {
        expect(l.get.bind(l, 0)).to.throw('Index: 0 Size: 0');
        expect(l.set.bind(l, 0, 'love')).to.throw('Index: 0 Size: 0');
        expect(l.remove.bind(l, 0)).to.throw('Index: 0 Size: 0');
    });

});

