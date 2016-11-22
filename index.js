/*
 * index.js - JS Collections namespace
 *
 * Copyright (C) 2016 Paolo Rovelli
 *
 * Author: Paolo Rovelli <paolorovelli@yahoo.it>
 */

var Collections = (function() {
    var c = {};

    c.arraylist = null;
    c.linkedlist = require('./src/linked-list.js');
    c.hashmap = null;
    c.treeset = null;

    return c;
}());

module.exports = Collections;
