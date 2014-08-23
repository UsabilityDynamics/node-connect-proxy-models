
Route.create({ hostname: 'express.sample.com', path: '/', backend: 'http://208.52.164.213:49153' }, function(err, model) {
  debug( 'created localhost route', err || model );
});

Route.create({ hostname: 'ud.helios.sample.com', path: '/', backend: 'http://nightculture.com/_tmp' }, function(err, model) {
  debug( 'created localhost route', err || model );
});

Route.create({ hostname: 'proxy.localhost', path: '/', backend: 'http://127.0.0.1:8006' }, function(err, model) {
  debug( 'created localhost route', err || model );
});

Route.create({ hostname: 'sample.com', path: '/', backend: 'http://google.com' }, function(err, model) {
  debug( 'created sample.com Route', err || model );
});

Route.create({ hostname: 'www.sample.com', path: '/', backend: 'http://yahoo.com' }, function(err, model) {
  debug( 'created www.sample.com Route', err || model );
});
