Object.defineProperties( module.exports, {
  start: {
    value: function start() {

      var Waterline = require('waterline');
      var memoryAdapter = require('sails-memory');
      var diskAdapter = require('sails-disk');
      var debug = require('debug')('connect-proxy-models');


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

      orm.loadCollection(Backend);

      orm.initialize({
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
    value: 'Backend',
    enumerable: true,
    configurable: false,
    writable: false
  },
});
