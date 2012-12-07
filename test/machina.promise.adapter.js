var Promise = require( "../lib/machina.promise.js" );

module.exports.fulfilled = function ( value ) {
	var d = new Promise();
	d.fulfill( value );
	return d;
}

module.exports.rejected = function ( reason ) {
	var d = new Promise();
	d.reject( reason );
	return d;
}

module.exports.pending = function () {
	var d = new Promise();

	return {
		promise: d,
		fulfill: d.fulfill,
		reject: d.reject
	};
}