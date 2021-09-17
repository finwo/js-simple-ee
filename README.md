# Simple EE

Simple event emitter

[![npm](https://img.shields.io/npm/v/simple-ee.svg?style=flat-square)](https://npmjs.com/package/simple-ee/)
[![npm](https://img.shields.io/npm/l/simple-ee.svg?style=flat-square)](https://npmjs.com/package/simple-ee/)


## Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#functions)
  - [new EE()](#constructor)
  - [ee.on()](#ee.on)
  - [ee.once()](#ee.once)
  - [ee.emit()](#ee.emit)
  - [ee.off()](#ee.off)
  - [aliases](#aliases)
- [Contributing guidelines](#contributing)
- [License](#license)

## Installation

```sh
npm install --save simple-ee
```

## Usage

```js
// Load the simple-ee module
var EE = require('simple-ee');

// A handler function we'll use later on
var handler = function(now) {
  console.log('Now:', now);
};

// Create a new simple event emitter
var YourModule = new EE();

// Register our event handler on the 'tick' event
YourModule.on('tick', handler);

// Register a handler that will fire once
YourModule.once('tick', function(now) {
  console.log('Running once');
  console.log('Now:', now);
});

// Make it tick every 1000ms
// Every second, you will see 'Now: <date>' in your console
var ticker = setInterval(function() {
  YourModule.emit('tick', new Date());
}, 1000);

// Let's remove the listener after 5 seconds
setTimeout(function() {
  YourModule.off('tick', handler);
  // The logs will stop now
  
  // Let's clear the interval to allow a node.js copy-paste to shut down
  clearInterval(ticker);
}, 5000);
```

## Functions

### constructor

The module returns a constructor to initiate a new instance of the event emitter.

```js
// Load the module
var EE = require('simple-ee');

// Initialize a bare event emitter
var instance = new EE();

// Attach all EE methods to an existing object
var existingObject = {};
EE(existingObject);

// Using the constructor inside another constructor
function customConstructor() {
  
  // Run it as a constructor on the 'this' reference
  // You could also claim 'this' is an existing object (so running 'EE(this)')
  EE.apply(this);
}

// Initializing it will attach all EE methods to the object
var customObject = new customConstructor();
```

### ee.on

Attach a new event handler to an instance of EE

```js
// This code should be run after the the constructor example

// Keep a reference to our handlers for later use
var exampleHandler = console.log.bind(console, '[example]:'),
    anyHandler     = console.log.bind(console, '[*]:');

// Listen for a named event
customObject.on('example', exampleHandler);

// Listens for any emitted event
customObject.on('*', anyHandler);
```

### ee.once

You can also attach a handler that will run only once instead of all the time

```js
// This code should be run after the ee.on example

// Attach once to a named event
customObject.once('rare', function() {
  console.log('[rare]: This should only occur once');  
});
```

### ee.emit

Emit an event on an existing EE instance

```js
// This code should be run after the ee.once example

// Emit an 'example' event
// Output:
//   [example]: Thu Apr 19 2018 13:24:35 GMT+0200 (CEST)
//   [*]: Thu Apr 19 2018 13:24:35 GMT+0200 (CEST)
customObject.emit('example', new Date());

// Emit an 'rare' event
// Output:
//   [rare]: This should only occur once
//   [*]: Thu Apr 19 2018 13:24:35 GMT+0200 (CEST)
customObject.emit('rare', new Date());

// Emit another 'rare' event
// Output:
//   [*]: Thu Apr 19 2018 13:24:35 GMT+0200 (CEST)
customObject.emit('rare', new Date());
```

### ee.off

Remove a specific handler from an EE instance

```js
// This code should be run after the ee.emit example

// Remove the example listener
customObject.off('example', exampleHandler);

// Emit again for this example
// Output:
//   [*]: Thu Apr 19 2018 13:24:35 GMT+0200 (CEST)
customObject.emit('example', new Date());
```

## License

[MIT](https://github.com/finwo/js-simple-ee/blob/master/LICENSE.md) (c) [Finwo](https://github.com/finwo)

