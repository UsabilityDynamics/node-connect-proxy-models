/**
 * Creates Waterline Collection for Backends
 *
 * - Stored in Memory.
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
    identity: 'backend',
    connection: 'clusterStore',
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
    },
    afterCreate: function afterCreate() {
      debug( 'Backend', 'afterCreate' );
    }
  }),
  enumerable: true,
  configurable: true,
  writable: true
});
