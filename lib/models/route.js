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
    identity: 'route',
    connection: 'memoryStore',
    afterCreate: function() {
      console.log( 'Route', 'afterCreate' );
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
  }),
  enumerable: true,
  configurable: false,
  writable: false
});