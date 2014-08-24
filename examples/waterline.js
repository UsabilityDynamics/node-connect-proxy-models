
var _ = require('lodash');
var Waterline = require('waterline');
var waterline = new Waterline();
var noop = function noop() {};

waterline.initialize({
  adapters: {
    memory: require( 'sails-memory' )
  },
  collections: {
    person: Waterline.Collection.extend({
      identity: 'person',
      connection: 'memoryStore',
      method1: function() {},
      attributes: {

        // Don't allow two objects with the same value
        lastName: {
          type: 'string',
          unique: true
        },

        // Ensure a value is set
        age: {
          type: 'integer',
          required: true
        },

        // Set a default value if no value is set
        phoneNumber: {
          type: 'string',
          defaultsTo: '111-222-3333'
        },

        // Create an auto-incrementing value (not supported by all data-stores)
        incrementMe: {
          type: 'integer',
          autoIncrement: true
        },

        // Index a value for faster queries
        emailAddress: {
          type: 'email', // Email type will get validated by the ORM
          index: true
        }
      }
    }),
    vehicle: Waterline.Collection.extend({
      identity: 'vehicle',
      connection: 'memoryStore',
      method1: function() {},
      attributes: {

        // Don't allow two objects with the same value
        lastName: {
          type: 'string',
          unique: true
        },

        // Ensure a value is set
        age: {
          type: 'integer',
          required: true
        },

        // Set a default value if no value is set
        phoneNumber: {
          type: 'string',
          defaultsTo: '111-222-3333'
        },

        // Create an auto-incrementing value (not supported by all data-stores)
        incrementMe: {
          type: 'integer',
          autoIncrement: true
        },

        // Index a value for faster queries
        emailAddress: {
          type: 'email', // Email type will get validated by the ORM
          index: true
        }
      }
    })
  },
  connections: {
    memoryStore: {
      adapter: 'memory',
      filePath: '/var/connect-proxy-models'
    }
  }
}, waterlineInitialized );

function waterlineInitialized(err, data) {

  data.collections.person.create( { lastName: 'potanin', age: 29 }, noop );
  data.collections.person.create( { lastName: 'smith', age: 29 }, noop );

  data.collections.person.find( { lastName: 'smith' }, console.log );

}
