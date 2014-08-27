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
Object.defineProperty( module, "exports", {
  value: require( 'waterline' ).Collection.extend({
    identity: 'proxy/route',
    schema: true,
    connection: [ 'elasticState' ],

    attributes: {
      title: {
        type: 'string',
        required: false,
        minLength: 5,
        maxLength: 100
      },
      priority: {
        type: 'integer'
      }
    },

    beforeCreate: function beforeCreate( values, cb ) {
      console.log( 'beforeCreate', values );

      cb();

    },
    afterCreate: function afterCreate( values, cb ) {
      console.log( 'Route', 'afterCreate' );
      cb();
    },

    checkBackends: function checkBackend( options, cb ) {

      cb( null, {} );
    },

    purgeCaches: function purgeCaches( options, cb ) {

      cb( null, {} );
    },

  }),
  enumerable: true,
  configurable: true,
  writable: true
});


