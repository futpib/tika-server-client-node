var fs = require( 'fs'),
    Promise = require( 'bluebird'),
    rp = require( 'request-promise' ),
    url = require( 'url' );

function tikaServerClient( host ) {

    if( host === undefined || host === null ) {
        throw new Error( 'host is required' );
    }

    if( typeof host == 'string' || host instanceof String ) {

        this._metaUrl = url.resolve( host, '/meta' );
        this._tikaUrl = url.resolve( host, '/tika' );

    } else {
        throw new Error( 'host must be a string' );
    }
}

function openFileStream( path ) {

    return new Promise( function( resolve, reject ) {

        var file;
        try {
            file = fs.createReadStream(path);
            file.on('open', function () {
                resolve(file);
            });

            file.on('error', function (err) {
                reject(err);
                this.destroy();
            });

        } catch( err ) {
            reject( err );

            if( file ) {
                file.destroy();
            }
        }
    });
}

tikaServerClient.prototype.metaFromFile = function( path ) {

    var request = {
        method: 'PUT',
        uri: this._metaUrl,
        headers: {
            "Accept": 'application/json'
        }
    };

    return openFileStream( path )
        .then( function( stream ) {
            return stream.pipe( rp( request ) )
        })
        .then( function( json ) {

            var meta = JSON.parse( json );
            return meta;
        });
}

tikaServerClient.prototype.tikaFromFile = function( path ) {

    var request = {
        method: 'PUT',
        uri: this._tikaUrl,
        headers: {
            "Accept": 'text/plain'
        }
    };

    return openFileStream( path )
        .then( function( stream ) {
            return stream.pipe( rp( request ) )
        });
}

tikaServerClient.prototype.metaFromUrl = function( url ) {

    var request = {
        method: 'PUT',
        uri: this._metaUrl,
        headers: {
            "Accept": 'application/json',
            'fileUrl': url
        }
    };

    return rp( request )
        .then( function( json ) {

            var meta = JSON.parse( json );
            return meta;
        });
}


tikaServerClient.prototype.tikaFromUrl = function( url ) {

    var request = {
        method: 'PUT',
        uri: this._tikaUrl,
        headers: {
            "Accept": 'text/plain',
            'fileUrl': url
        }
    };

    return rp( request );
}

module.exports = tikaServerClient;