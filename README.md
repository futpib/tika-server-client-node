# Introduction

A client for Apache's tika-server.  Built on bluebird promises.

# Examples

## Meta Requests

### metaFromFile( path )

```js
var TikaClient = require( 'tika-server-client' );
var tika = new TikaClient( 'http://localhost:9998' );

tika
    .metaFromFile( 'hello-world.odt' )
    .then( function( meta ) {

        var json = JSON.stringify( meta, null, 4 );
        console.log( json );
    });
```

### metaFromUrl( url )

```js
var TikaClient = require( 'tika-server-client' );
var tika = new TikaClient( 'http://localhost:9998' );

tika
    .metaFromUrl( 'http://localhost:9998/tika' )
    .then( function( meta ) {

        var json = JSON.stringify( meta, null, 4 );
        console.log( json );
    });
```

### metaFromStream( readableStream )

```js
var TikaClient = require( 'tika-server-client' );
var tika = new TikaClient( 'http://remotehost.localdomain:9998' );

tika
    .metaFromStream( fs.createReadStream('hello-world.odt') )
    .then( function( meta ) {

        var json = JSON.stringify( meta, null, 4 );
        console.log( json );
    });
```

## Tika Requests

### tikaFromFile( path )

```js
var TikaClient = require( 'tika-server-client' );
var tika = new TikaClient( 'http://localhost:9998' );

tika
    .tikaFromFile( 'hello-world.odt' )
    .then( function( text ) {

        console.log( text );
    });
```

### tikaFromUrl( url )

```js
var TikaClient = require( 'tika-server-client' );
var tika = new TikaClient( 'http://localhost:9998' );

tika
    .tikaFromUrl( 'http://localhost:9998/tika' )
    .then( function( text ) {

        console.log( text );
    });
```

### tikaFromStream( readableStream )

```js
var TikaClient = require( 'tika-server-client' );
var tika = new TikaClient( 'http://remotehost.localdomain:9998' );

tika
    .tikaFromStream( fs.createReadStream('hello-world.odt') )
    .then( function( text ) {

        console.log( text );
    });
```
