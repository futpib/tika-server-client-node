var assert = require( 'assert')
    ip = require( 'ip' ),
    StaticServer = require('static-server'),
    TikaClient = require( '..' ),
    url = require( 'url' );

var httpPort = 44444;

describe('tika-server-client', function() {

    describe( 'unit-tests', function() {

        describe('constructor', function () {

            it('should throw if host is undefined', function () {

                try {
                    new TikaClient();
                    assert.fail('constructor should have thrown Error');
                } catch (error) {
                    assert.equal(error.message, 'host is required');
                }
            });

            it('should throw if host is null', function () {

                try {
                    new TikaClient(null);
                    assert.fail('constructor should have thrown Error');
                } catch (error) {
                    assert.equal(error.message, 'host is required');
                }
            });

            it('should accept host', function () {

                var client = new TikaClient('http://test:9998');
                assert.equal(client._metaUrl, 'http://test:9998/meta');
                assert.equal(client._tikaUrl, 'http://test:9998/tika');
            });
        });
    });

    describe('integration-tests', function () {

        var tika = new TikaClient('http://localhost:9998');

        var server = new StaticServer({
            rootPath: 'test/resources',
            port: httpPort
        });

        var serverBaseUrl = url.format({
            protocol: 'http',
            hostname: ip.address(),
            port: httpPort
        });

        before( function ( done ) {
            console.log( 'starting test http server\n' );
            server.start( done );
        });

        after( function () {
            console.log( 'stopping test http server\n' );
            server.stop();
        });

        // ----------------------------------------------------------------------------
        // metaFromFile
        // ----------------------------------------------------------------------------

        describe('metaFromFile', function () {

            it('when file does not exist, should throw exception', function (done) {

                tika.metaFromFile( 'test/resources/junk' )
                    .then( function ( meta ) {
                        done( 'Server should not have been contacted');
                    })
                    .catch( function( reason ) {
                        assert.equal( reason.code, 'ENOENT' );
                        done();
                    });
            });

            it('when file exists, should return meta data (HTML)', function (done) {

                tika.metaFromFile( 'test/resources/test.html' )
                    .then( function ( meta ) {

                        var contentType = meta[ "Content-Type" ];
                        assert.equal( contentType, 'text/html; charset=UTF-8' );

                        done();
                    })
                    .catch( function( reason ) {
                        done( reason );
                    });
            });

            it('when file exists, should return meta data (ODT)', function (done) {

                tika.metaFromFile( 'test/resources/test.odt' )
                    .then( function ( meta ) {

                        var contentType = meta[ "Content-Type" ];
                        assert.equal( contentType, 'application/vnd.oasis.opendocument.text' );

                        done();
                    })
                    .catch( function( reason ) {
                        done( reason );
                    });
            });
        });

        // ----------------------------------------------------------------------------
        // tikaFromFile
        // ----------------------------------------------------------------------------

        describe('tikaFromFile', function () {

            it('should return text (HTML)', function (done) {

                tika.tikaFromFile( 'test/resources/test.html' )
                    .then( function ( text ) {

                        assert.equal( text.trim(), 'This is an html file.' );
                        done();
                    })
                    .catch( function( reason ) {
                        done( reason );
                    });
            });

            it('should return text (ODT)', function (done) {

                tika.tikaFromFile( 'test/resources/test.odt' )
                    .then( function ( text ) {

                        assert.equal( text.trim(), 'This is an odt file.' );
                        done();
                    })
                    .catch( function( reason ) {
                        done( reason );
                    });
            });
        });

        // ----------------------------------------------------------------------------
        // metaFromUrl
        // ----------------------------------------------------------------------------

        describe('metaFromUrl', function () {

            it('should return meta data (HTML)', function (done) {

                tika.metaFromUrl( serverBaseUrl + '/test.html' )
                    .then( function ( meta ) {

                        var contentType = meta[ "Content-Type" ];
                        assert.equal( contentType, 'text/html; charset=UTF-8' );

                        done();
                    })
                    .catch( function( reason ) {
                        done( reason );
                    });
            });

            it('should return meta data (ODT)', function (done) {

                tika.metaFromUrl( serverBaseUrl + '/test.odt' )
                    .then( function ( meta ) {

                        var contentType = meta[ "Content-Type" ];
                        assert.equal( contentType, 'application/vnd.oasis.opendocument.text' );

                        done();
                    })
                    .catch( function( reason ) {
                        done( reason );
                    });
            });
        });

        // ----------------------------------------------------------------------------
        // tikaFromUrl
        // ----------------------------------------------------------------------------

        describe('tikaFromUrl', function () {

            it('should return text (HTML)', function (done) {

                tika.tikaFromUrl( serverBaseUrl + '/test.html' )
                    .then( function ( text ) {

                        assert.equal( text.trim(), 'This is an html file.' );
                        done();
                    })
                    .catch( function( reason ) {
                        done( reason );
                    });
            });

            it('should return text (ODT)', function (done) {

                tika.tikaFromUrl( serverBaseUrl + '/test.odt' )
                    .then( function ( text ) {

                        assert.equal( text.trim(), 'This is an odt file.' );
                        done();
                    })
                    .catch( function( reason ) {
                        done( reason );
                    });
            });
        });
    });
});
