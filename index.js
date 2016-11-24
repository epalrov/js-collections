/*
 * index.js - js-collections namespace
 *
 * Copyright (C) 2016 Paolo Rovelli
 *
 * Author: Paolo Rovelli <paolorovelli@yahoo.it>
 */

var collections = (function() {
    var c = {};

    c.arraylist = null;
    c.linkedlist = require('./src/linked-list.js');
    c.hashmap = null;
    c.treeset = null;

    return c;
}());

module.exports = collections;
