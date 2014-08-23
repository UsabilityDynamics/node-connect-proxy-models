Object.defineProperties( module.exports, {
  start: {
    value: function start() {

      var debug = require('debug')('connect-proxy-models');

      var Waterline = require('waterline');
      var memoryAdapter = require('sails-memory');
      var diskAdapter = require('sails-disk');

      var orm = new Waterline();

      var Backend = Waterline.Collection.extend({
        identity: 'backend',
        connection: 'myLocalDisk',
        attributes: {
          id: 'string',
          name: 'string',
          container: 'string'
        }
      });

      var Route = Waterline.Collection.extend({
        identity: 'route',
        connection: 'myMemoryStorage',
        /**
         *
         * beforeValidate
         * afterValidate
         * beforeUpdate
         * afterUpdate
         * beforeCreate
         * afterCreate
         * beforeDestroy
         * afterDestroy
         *
         */
        afterCreate: function() {
          debug( 'Route', 'afterCreate' );

        },
        attributes: {
          name: {
            type: 'string',
            required: false,
            minLength: 5,
            maxLength: 100
          },
          hostname: {
            type: 'string',
            required: true,
            minLength: 5,
            maxLength: 100
          },
          path: {
            type: 'string',
            required: true,
            minLength: 0
          },
          config: {
            type: 'json'
          },
          priority: {
            type: 'integer'
          }
        }
      });

      orm.loadCollection(Route);

      orm.initialize( {
        adapters: {
          memory: memoryAdapter,
          disk: diskAdapter
        },
        connections: {
          myLocalDisk: {
            adapter: 'disk'
          },
          myMemoryStorage: {
            adapter: 'memory'
          }
        },
        defaults: {
          migrate: 'alter'
        }
      }, modelReady );

      function modelReady(err, models) {

        if(err) {
          console.log( err );
        }

        app.models = models.collections;
        app.connections = models.connections;

      }

    },
    enumerable: true,
    configurable: false,
    writable: true
  },
  name: {
    value: 'Route',
    enumerable: true,
    configurable: false,
    writable: false
  },
});
