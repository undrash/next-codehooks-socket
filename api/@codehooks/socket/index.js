import { Server } from 'socket.io';

export class SocketHooks {
  // TODO: Accept a config, pass it down to useSocket etc.
  constructor(app) {
    if (!app) {
      throw new Error('App is required when instantiating SocketHooks');
    }

    this.socket = null;
    this.listeners = {};

    this._useSocket(app);
  }

  _registerListeners = () => {
    for (let endpoint in this.listeners) {
      this.socket.on(endpoint, this.listeners[endpoint]);
    }
  };

  _useSocket = (app) => {
    app.get('/socket', async (req, res) => {
      console.log('Establishing socket connection.');

      if (res.socket.server.io) {
        console.log('Socket connection is already established.');
        res.end();
        return;
      }

      const io = new Server(res.socket.server, {
        cors: {
          origin: '*',
        },
      });

      res.socket.server.io = io;

      const onConnection = (socket) => {
        console.log('Client connected.');
        this.socket = socket;
        this._registerListeners(io, socket);
      };

      io.on('connection', onConnection);

      res.end();
    });

    app.socket = (path, callback) => {
      this.listeners[path] = callback;
    };
  };

  emit = (event, data) => {
    if (!this.socket) {
      console.error('Socket not connected.');
      return;
    }

    this.socket.broadcast.emit(event, data);
  };
}
