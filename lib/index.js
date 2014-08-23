/**
 *
 */
Object.defineProperties( module.exports, {
  Backend: {
    value: require( './backend' ),
    enumerable: true,
    configurable: false,
    writable: true
  },
  Service: {
    value: {},
    enumerable: true,
    configurable: false,
    writable: true
  },
  Route: {
    value: require( './route' ),
    enumerable: true,
    configurable: false,
    writable: true
  }
});
