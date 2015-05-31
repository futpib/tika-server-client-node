var TikaClient = require( 'tika-server-client' );
var tika = new TikaClient( 'http://localhost:9998' );

tika
    .tikaFromUrl( 'http://localhost:9998/tika' )
    .then( function( text ) {

        console.log( text );
    });
