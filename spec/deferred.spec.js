if ( typeof expect === "undefined" ) {
	var Promise = require( "../lib/machina.promise.js" );
	var expect = require( "expect.js" );
}


describe( "machina.Promise", function () {
	var d;

	beforeEach( function () {
		d = new Promise();
	});

	describe( "When resolving", function () {
		it( "Should call completeCallback when a promise is fulfilld", function ( done ) {
			d.then( function ( data ){
				expect( data ).to.be( "Test" );
				done();
			});

			d.fulfill( "Test" );
		});

		it( "Should still call completeCallback for each then() added to the promise", function ( done ) {
			var counter = 0;

			d.then( function ( data ) {
				counter++;
				expect( data ).to.be( "Test" );
			});

			d.fulfill( "Test" );

			d.then( function ( data ) {
				counter++;
				expect( data ).to.be( "Test" );
				expect( counter ).to.be( 2 );
				done();
			});
		});
	});

	describe( "When rejecting", function () {
		it( "Should call an errorCallback when a promise is rejected", function ( done ) {
			d.then( null, function ( data ){
				expect( data ).to.be( "Test" );
				done();
			});

			d.reject( "Test" );
		});

		it( "Should still call an errorCallback for each then() added to the promise", function ( done ) {
			var counter = 0;

			d.then( null, function ( data ) {
				counter++;
				expect( data ).to.be( "Test" );
			});

			d.reject( "Test" );

			d.then( null, function ( data ) {
				counter++;
				expect( data ).to.be( "Test" );
				expect( counter ).to.be( 2 );
				done();
			});
		});

	});

	describe( "Then", function () {
		it( "Should return a new promise from each then", function ( done ) {
			var counter = 0;
			d.then(function ( data ) {
				counter++;
				expect( data ).to.be( "Test" );
				expect( counter ).to.be( 1 );
				return data + " Message";
			}).then( function ( data ){
				counter++;
				expect( data ).to.be( "Test Message" );
				expect( counter ).to.be( 2 );
			}).then( function ( data ) {
				counter++;
				expect( data ).to.be( undefined );
				expect( counter ).to.be( 3 );
				done();
			});

			d.fulfill( "Test" );
		});
	});
});