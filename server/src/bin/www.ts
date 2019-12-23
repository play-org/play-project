#!/usr/bin/env node

import http from 'http';
import url from 'url';
import app from '../app';
import createWs from '../ws';
import sessionParser from '../middlewares/session';

var debug = require('debug')('server:server');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

const wss = createWs();

/**
 * upgrade protocol
 */
server.on('upgrade', function(req, socket, head) {
  const pathname = url.parse(req.url).pathname;
  sessionParser(req, {} as any, () => {
    if (pathname == '/chat') {
      wss.handleUpgrade(req, socket, head, function(ws) {
        wss.emit('connection', ws, req);
      });
    } else {
      socket.destroy();
      return;
    }
  });
});
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
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

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

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

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr!.port;
  debug('Listening on ' + bind);
}
