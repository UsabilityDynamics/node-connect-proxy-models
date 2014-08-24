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
    identity: 'server',
    connection: 'memoryStore',
    afterCreate: function() {
      console.log( 'Server', 'afterCreate' );
    },
    attributes: {
      address: {
        type: 'string',
        required: true
      },
      ssl: {
        type: 'string'
      }
    }
  }),
  enumerable: true,
  configurable: false,
  writable: false
});