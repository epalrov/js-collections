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

    it('should create a new linked list', function() {
        var l = new List();
        expect(l.isEmpty()).to.equal(true);
    });

});

