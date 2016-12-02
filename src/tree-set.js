/*
 * tree-set.js - example of Tree Set implementation
 *
 * Copyright (C) 2016 Paolo Rovelli
 *
 * Author: Paolo Rovelli <paolorovelli@yahoo.it>
 */

'use strict';

/**
 * Unbalanced tree implementation of the <tt>Set</tt> interface.
 *
 * All of the operations perform as could be expected for an unbalanced binary
 * tree. Balancing as a Red-Black binary tree is strightforward.
 */

/**
 * Constructs a <tt>TreeSetEntry</tt>
 */
function TreeSetEntry(e, p) {
    this.elem = e;
    this.parent = p;
    this.left = null;
    this.right = null;
}

/**
 * Constructs an empty <tt>TreeSet</tt>
 */
function TreeSet() {
    this.root = null;
    this.count = 0;

//    function getFirstEntry() {
//        var e = this.root;
//        if (e) {
//            while (e.left)
//                e = e.left;
//        }
//        return e;
//    }
//
//    function getNextEntry(e) {
//        var n, c;
//
//        if (!e)
//            return null;
//
//        if (!e.right) {
//            c = e;
//            n = e.parent;
//            while (n && c === n.right) {
//                c = n;
//                n = n.parent;
//            }
//        } else {
//            n = e.right;
//            while (n.left)
//                n = n.left;
//        }
//        return n;
//    }
//
//    function removeEntry(e) {
//        var n, c;
//
//        if (!e)
//            return;
//
//        // Entry with two children:
//        // - replace the specified entry with its successor by copying.
//        // - note that a successor always exixts!
//        // - note also that the replacement alghoritm continue!
//        if (e.left && e.right) {
//            n = getNextEntry(e);
//            e.elem = n.elem;
//            e = n;
//        }
//
//        // Entry with one child or no children
//        c = (e.left ? e.left : e.right);
//        if (c)
//            c.parent = e.parent;
//
//        if (!e.parent)
//            this.root = c;
//        else if (e === e.parent.left)
//            e.parent.left = c;
//        else
//            e.parent.right = c;
//    }
}

/**
 * Returns the number of elements in this set.
 */
TreeSet.prototype.size = function() {
    return this.count;
};

/**
 * Returns <tt>true</tt> if this set contains no elements.
 */
TreeSet.prototype.isEmpty = function() {
    return this.count === 0 ? true : false;
};

/**
 * Adds the specified element to this set if it is not already present.
 * If this set already contains the element, the call leaves the set
 * unchanged and returns <tt>false</tt>.
 */
TreeSet.prototype.add = function(elem) {
    var cmp = 0;
    var e = this.root;
    var parent = e;

    // a null element is not comparable
    if (!elem)
        throw new Error('Null pointer exception');

    // add the new element to an empty set
    if (!e) {
        this.root = new TreeSetEntry(elem, null);
        this.count++;
        return true;
    }

    // walk the tree looking for the element if already present
    while (e) {
        parent = e;
        cmp = elem.compareTo(e.elem);
        if (cmp < 0)
            e = e.left;
        else if (cmp > 0)
            e = e.right;
        else // (cmp === 0)
            return false;
    }

    // add the new entry as leaf of the current parent position
    e = new TreeSetEntry(elem, parent);
    if (cmp < 0)
        parent.left = e;
    else
        parent.right = e;
    this.count++;
    return true;
};

module.exports = TreeSet;
