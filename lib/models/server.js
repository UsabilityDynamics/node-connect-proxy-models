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
Object.defineProperty( module, 'exports', {
  value: require( 'waterline' ).Collection.extend({
    identity: 'server',
    connection: 'clusterStore',
    attributes: {
      address: {
        type: 'string',
        required: true
      },
      ssl: {
        type: 'string'
      }
    },
    afterCreate: function afterCreate() {
      console.log( 'Server', 'afterCreate' );
    }
  }),
  enumerable: true,
  configurable: true,
  writable: true
});