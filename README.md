# machina.Promise

A lightweight [Promises/A](http://wiki.commonjs.org/wiki/Promises/A#Proposal) compliant implementation for projects already using the [machina](http://machina-js.org) state machine library. It does not currently implement progress callbacks.

## Examples

**Basic Example**

```javascript
var promise = new machina.Promise();

promise.then( function ( num ) {
	return num + 5
}).then( function ( num ) {
	console.log( "New number", num ); // Expected output is 7
});

promise.fulfill( 7 );
```

**Basic Example with an Error Handler**

```javascript
var promise = new machina.Promise();

promise.then( null, function ( reason ) {
	console.log( "Error", reason );

	// Use 0 when the promise fails
	return 0;
})
.then( function ( num ) {
	return num + 5
})
.then( function ( num ) {
	console.log( "New number", num ); // Expected output is 5
});

promise.reject( "AJAX call");
```

## API

`machina.Promise` - Constructor

**Usage**: `var promise = new machina.Promise()`

`machina.Promise.useExtensions` - `Boolean` - Configuration property

To use strict Promises/A, set this property to `false`. The differences are as follows:

### Callbacks returning promises

* In `useExtensions = true` mode, if a `then` *callback* returns a promise, the promise returned from the `then` *method itself* won't be fulfilled or rejected until the callbacks promise was fulfilled or rejected.
* In `useExtensions = false` mode, the result from the callback, even if its a promise, will be passed to the next callback as the `value`.

### Always Asynchronous

* In `useExtensions = true` mode, callbacks in `then` are always executed asynchronously, even if the promise is already fulfilled or rejected when the callbacks are attached. 
* In `useExtensions = false` mode, callbacks will be asynchronous until the promise is fulfilled or rejected. Subsequent callbacks attached to the promise will be executed synchronously
 
### Instance Methods

In addition to the normal machina FSM API, the following methods are exposed:

* `reject( reason )` - Move a promise into a `failed` state. The first parameter passed to this method is used as the reason.
* `fulfill( value )` - Move a promise into a `fulfilled` state. The first parameter passed to this method is used as the value of the fulfilled promise.
* `then( fulfilledCallback, rejectedCallback )` - Returns a new `Promise` - Attach callbacks to be notified when a promise is rejected or fulfilled (or both). The new promise returned by this method will be resolved with return value from either the fulfilled or rejected callback, or rejected if either of the callbacks throw an error. For finer control over this, you can return your own promise from either callback, and that new promise will control the fulfilled or rejected state of the existing promise returned by this method.

## Tests

There are a few tests in the `spec` folder, but there is a test adapter for the incredible [domenic/promise-tests](https://github.com/domenic/promise-tests).

Download or fork and clone the repo to your computer, then (first time only):

```sh
cd machina.promise
npm install
```

Then to run the tests:

```sh
npm test
```

## Development

This repository uses the [Anvil build system](http://github.com/anviljs/anvil.js). It is not included as dependency as `anvil` is normally installed globally.  To install `anvil`:

```sh
npm install -g anvil
```

To run the build (Takes the files from `src` and builds them into `lib`):

```sh
anvil
```

To run the build continually after each change:

```sh
anvil --ci
```


## License

This project is available under a dual license of MIT or GPL v2.0

---

Copyright (c) 2012 appendTo (MIT License)

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

See the MIT License for more details: http://opensource.org/licenses/MIT

---

Copyright (C) 2012 appendTo (GPL v2.0 License)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or (at
your option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
or FITNESS FOR A PARTICULAR PURPOSE.

See the GNU General Public License for more details:
http://opensource.org/licenses/GPL-2.0