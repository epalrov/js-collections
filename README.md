[![Build Status](https://travis-ci.org/epalrov/js-collections.svg?branch=master)](https://travis-ci.org/epalrov/js-collections)
[![Code Climate](https://codeclimate.com/github/epalrov/js-collections/badges/gpa.svg)](https://codeclimate.com/github/epalrov/js-collections)
[![Code Coverage](https://codeclimate.com/github/epalrov/js-collections/badges/coverage.svg)](https://codeclimate.com/github/epalrov/js-collections)

# js-collections

js-collections represents a unified library for storing and manipulating groups of object. This implementation offer a variety of representations, including:
 - arrays (ArrayList) - have the properties of random-access memory: very fast for accessing elements by position and for iterating over them, but slower for inserting and removing elements at arbitrary positions because require adjusting the position of other elements.
 - linked lists (LinkedList) - accessing elements by position is slow, because you have to follow the reference chain from the start of the list, but insertion and removal operations can be performed in constant time by rearranging the cell references.
 - hash tables (HashMap) - provide a way of storing elements indexed on their content rather than on an integer-valued index, as with lists. In contrast to arrays and linked lists, hash tables provide no support for accessing elements by position, but access by content is usally very fast, as are insertion and removal.
 - trees (TreeSet) - organize their elements by content, but with the important difference that they can store and retrieve them in sorted order. They are relatively fast for the operations of inserting and removing elements, accessing them by content and iterating over them.

A large variety of methods are implemented, in the same fashion as the standard Java Collection Framework (java.util).

Finally it would be a good way to learn about JavaScript Object-Oriented Programming :-)

## Installing

To install the task runner, run `sudo npm install -g gulp`

To install project dependencies `npm install`

## Building and Testing

To build, run `gulp`.

To test, run `gulp test`.

To test against code standards, run `gulp lint`.

## Contact

paolorovelli@yahoo.it

