Promise.Node = function ( method ) {

	return function () {
		var p = new Promise();
		var args = [].slice.call( arguments );

		args.push( function ( err, data ) {
			if ( err ) {
				p.reject( err );
			} else {
				p.fulfill( data );
			}
		});

		method.apply( method, args );
		
		return p;
	};

};