#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from '../app.js';
import d from 'debug';
// var debug = require('debug')('tin-ceny-produktow-sikorski-s22518:server');
import { createServer } from 'http';
import init from '../config/sequalize/init.js';
const debug = d('tin-ceny-produktow-sikorski-s22518:server')

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(server) {
  return () => {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
}

async function start() {
  /**
   * Get port from environment and store in Express.
   */
  var port = normalizePort(process.env.PORT || '8080');
  app.set('port', port);

  /**
   * Database initialization
   */
  await init()

  /**
   * Create HTTP server.
   */
  var server = createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port, () => {
    console.log('🙉 on port http://localhost:' + port)
  });
  server.on('error', onError);
  server.on('listening', onListening(server));
}

start()
  .catch(err => {
    console.error(err)
  })
