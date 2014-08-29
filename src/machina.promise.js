(function ( root, factory ) {
  if ( typeof module === "object" && module.exports ) {
    // Node, or CommonJS-Like environments
    var _ = require( "lodash" );
    module.exports = factory( _, require( "machina" ) );
  } else if ( typeof define === "function" && define.amd ) {
    // AMD. Register as an anonymous module.
    define( ["lodash", "machina"], function ( _, machina ) {
      return factory( _, machina, root );
    } );
  } else {
    // Browser globals
    root.machina.Promise = factory( root._, root.machina, root );
  }
}( this, function ( _, machina, global, undefined ) {

  //import("promise.js");

  return Promise;
} ));