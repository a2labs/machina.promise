var Promise = machina.Fsm.extend({
	initialState: "unfulfilled",
	initialize: function () {
		_.bindAll( this, "reject", "fulfill", "then" );
	},
	reject: function ( data ) {
		this.handle( "process", { action: "failed", data: data } );
	},
	fulfill: function ( data ) {
		this.handle( "process", { action: "fulfilled", data: data } );
	},
	then: function ( completeHandler, errorHandler ) {
		var self = this;
		var promise = new Promise();

		var callback = function () {
			self.off( "fulfilled", callback );
			self.off( "failed", callback );

			var fulfilled = self.state === "fulfilled";
			var handler = fulfilled ? completeHandler : errorHandler;
			var ret;

			if ( handler ) {
				try {
					ret = handler.apply( null, arguments );
				} catch ( e ) {
					promise.reject.call( null, e );
					return;
				}
				if ( Promise.useExtensions && ret && ret.then ) {
					ret.then( promise.fulfill, promise.reject );
				} else {
					promise.fulfill.call( null, ret );
				}
			} else {
				promise[ fulfilled ? "fulfill" : "reject" ].apply( null, arguments );
			}
		};

		this.on( "fulfilled", callback );
		this.on( "failed", callback );


		if ( Promise.useExtensions ) {
			_.defer( function () {
				self.handle( "then" );
			});
		} else {
			this.handle( "then" );
		}

		return promise;
	},
	states: {
		unfulfilled: {
			process: function( params ) {
				this._data = params.data;
				this.transition( params.action );
				this.handle( "then" );
			}
		},
		fulfilled: {
			then: function () {
				this.emit( "fulfilled", this._data );
			}
		},

		failed: {
			then: function () {
				this.emit( "failed", this._data );
			}
		}
	}
});

Promise.useExtensions = true;