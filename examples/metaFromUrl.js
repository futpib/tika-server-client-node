var TikaClient = require( 'tika-server-client' );
var tika = new TikaClient( 'http://localhost:9998' );

tika
    .metaFromUrl( 'http://localhost:9998/tika' )
    .then( function( meta ) {

        var json = JSON.stringify( meta, null, 4 );
        console.log( json );
    });
