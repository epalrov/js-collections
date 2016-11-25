/*
 * linked-list.js - example of Linked List implementation
 *
 * Copyright (C) 2016 Paolo Rovelli
 *
 * Author: Paolo Rovelli <paolorovelli@yahoo.it>
 */

'use strict';

/**
 * Linked list implementation of the <tt>List</tt> interface.
 *
 * All of the operations perform as could be expected for a doubly-linked
 * list. Operations that index into the list will traverse the list from
 * the beginning or the end, whichever is closer to the specified index.
 */

/**
 * Constructs a <tt>LinkedListNode</tt>
 */
function LinkedListNode(e, n, p) {
    this.elem = e;
    this.next = n;
    this.prev = p;
}

/**
 * Constructs an empty <tt>LinkedList</tt>
 */
function LinkedList() {
    this.head = new LinkedListNode(null, null, null);
    this.head.next = this.head;
    this.head.prev = this.head;
    this.count = 0;
}

/**
 * Returns the number of elements in this list.
 */
LinkedList.prototype.size = function() {
    return this.count;
};

/**
 * Returns <tt>true</tt> if this list contains no elements.
 */
LinkedList.prototype.isEmpty = function() {
    return this.count === 0 ? true : false;
};

/**
* Appends the specified element to the end of this list.
*/
LinkedList.prototype.add = function(e) {
    var n = this.head;
    var node = new LinkedListNode(e, n, n.prev);
    n.prev.next = node;
    n.prev = node;
    this.count++;
    return true;
};

//  /**
//   * Inserts the specified element at the specified position in this list.
//  */
//  LinkedList.prototype.add2 = function(index, e) {
//      var i, n = this.head;
//      if (index >= 0 && index < this.count/2) {
//          for (i = 0; i <= index; i++)
//              n = n.next;
//      } else if (index < this.count && index >= this.count/2) {
//          for (i = this.count; i > index; i--)
//              n = n.prev;
//      } else {
//          throw new RangeError('Index: ' + index + ' Size: ' + this.count);
//      }
//      var node = new LinkedListNode(e, n, n.prev);
//      n.prev.next = node;
//      n.prev = node;
//      this.count++;
//  };

/**
 * Returns the element at the specified position in this list.
 */
LinkedList.prototype.get = function(index) {
    var i, n = this.head;
    if (index >= 0 && index < this.count/2) {
        for (i = 0; i <= index; i++)
            n = n.next;
    } else if (index < this.count && index >= this.count/2) {
        for (i = this.count; i > index; i--)
            n = n.prev;
    } else {
        throw new RangeError('Index: ' + index + ' Size: ' + this.count);
    }
    return n.elem;
};

/**
 * Replaces the element at the specified position in this list with the
 * specified element.
 */
LinkedList.prototype.set = function(index, e) {
    var i, n = this.head;
    if (index >= 0 && index < this.count/2) {
        for (i = 0; i <= index; i++)
            n = n.next;
    } else if (index < this.count && index >= this.count/2) {
        for (i = this.count; i > index; i--)
            n = n.prev;
    } else {
        throw new RangeError('Index: ' + index + ' Size: ' + this.count);
    }
    var oldElem = n.elem;
    n.elem = e;
    return oldElem;
};

/**
 * Removes the element at the specified position in this list.
 */
LinkedList.prototype.remove = function(index) {
    var i, n = this.head;
    if (index >= 0 && index < this.count/2) {
        for (i = 0; i <= index; i++)
            n = n.next;
    } else if (index < this.count && index >= this.count/2) {
        for (i = this.count; i > index; i--)
            n = n.prev;
    } else {
        throw new RangeError('Index: ' + index + ' Size: ' + this.count);
    }
    n.next.prev = n.prev;
    n.prev.next = n.next;
    this.count--;
    return n.elem;
};

/**
 * Removes all of the elements from this list.
 */
LinkedList.prototype.clear = function() {
    var n = this.head;
    while (this.count > 0) {
        n.next.prev = n.prev;
        n.prev.next = n.next;
        this.count--;
    }
};

module.exports = LinkedList;
