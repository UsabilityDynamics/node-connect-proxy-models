module.exports = {

  before: function() {

    module.Models = undefined;

    module.Middleware = function ourTestMiddleware( req, res ) {
      res.send( 'default middleware works' );
    };

    var Waterline = require( 'waterline');
    var searchAdapter = require('waterline-elasticsearch');
    var memoryAdapter = require('sails-memory');
    var diskAdapter = require('sails-disk');

    this.orm = new Waterline();
    this.ServerModel = require( '../').Server;
    this.testData = require( './fixtures/servers.json' );

    this.config = {
      adapters: {
        search: searchAdapter,
        disk: diskAdapter,
        memory: memoryAdapter
      },
      collections: {
        Server: this.ServerModel
      },
      connections: {
        elasticState: {
          adapter: 'disk'
        },
        persistent: {
          adapter: 'memory'
        },
        memory: {
          adapter: 'memory'
        }
      }
    };

  },

  "Server model": {

    "appears valid.": function() {

      this.ServerModel.should.have.property( 'extend' );

    },

    "can initialize and return valid connection.": function( done ) {

      this.orm.initialize( this.config, function( error, models ) {

        if( error && error.message !== 'Connection is already registered' ) {
          return error( error );
        }

        if( error && error.message === 'Connection is already registered' ) {
          return done();
        }

        module.Collections = models.collections;
        module.Connections = models.connections;

        module.Connections.should.have.property( 'elasticState' );
        module.Connections.should.have.property( 'persistent' );
        module.Connections.should.have.property( 'memory' );
        module.Collections.should.have.property( 'application/server' );

        module.Collections[ 'application/server' ].should.have.property( 'meta' );
        module.Collections[ 'application/server' ].should.have.property( 'definition' );
        module.Collections[ 'application/server' ].should.have.property( 'create' );
        module.Collections[ 'application/server' ].should.have.property( 'createEach' );
        module.Collections[ 'application/server' ].should.have.property( 'findOne' );

        done();

      })

    },

    "can create instances from test data.": function( done ) {

      module.Collections[ 'application/server' ].createEach( require( './fixtures/servers' ), function serversCreated( error, models ) {

        // error.should.be( null );
        // models.length.should.be( 2 );

        done();

      });

    },

    "can find a created isntance.": function( done ) {

      module.Collections[ 'application/server' ].findOne( { title: 'api-server' }, function findDone( error, apiServer ) {


        apiServer.should.have.properties( '_type', 'title', 'status', 'port', 'address', 'createdAt', 'updatedAt', 'use', 'start' );

        done();

      })

    },

    "can register middleware": function( done ) {

      module.Collections[ 'application/server' ].findOne( { title: 'www-server' }, function findDone( error, wwwServer ) {

        wwwServer.use( module.Middleware )

        done();

      });

    },

    "can update a single instance.": function( done ) {

      module.Collections[ 'application/server' ].update({ _id: 'www-server' }, { port: 8095 }, function( error, model ) {

        model[0].should.have.properties( '_id', '_type', 'title', 'status', 'port', 'address', 'createdAt', 'updatedAt' );
        model[0].should.have.property( 'port', 8095 );

        done();

      })

    },

    "can start and access server.": function( done ) {

      module.Collections[ 'application/server' ].findOne( { title: 'www-server' }, function findDone( error, wwwServer ) {

        wwwServer.use( function firstMiddleware( req, res, next ) {
          res.set( 'x-powered-by', 'Waterline Model Test Server' );
          next();
        });

        wwwServer.use( function secondMiddleware( req, res, next ) {
          res.set( 'x-custom-middleware', true );
          next();
        });

        wwwServer.use( module.Middleware )

        wwwServer.start( function() {

          require( 'request' ).get( [ 'http://localhost', wwwServer.port ].join( ':' ), function( error, req, body ) {

            req.headers.should.have.property( 'x-powered-by', 'Waterline Model Test Server' )
            req.headers.should.have.property( 'x-custom-middleware', 'true' )

            body.should.equal( 'default middleware works' )

            wwwServer.stop( done );

          });

        });


      });

    }

  }

}




