var TikaClient = require( 'tika-server-client' );
var tika = new TikaClient( 'http://localhost:9998' );

tika
    .tikaFromFile( 'hello-world.odt' )
    .then( function( text ) {

        console.log( text );
    });
