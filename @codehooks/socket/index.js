import io from 'socket.io-client';

export class SocketClient {
  constructor(url) {
    if (!url) {
      throw new Error('Socket URL is required');
    }

    this.url = null;

    try {
      this.url = new URL(url);
    } catch (err) {
      throw new Error('Invalid socket URL');
    }

    this.socket = null;
  }

  async _initConnection() {
    await fetch(`${this.url.href}/socket`).catch(() => {
      console.log('Socket connection attempt failed.');
    });
  }

  async connect() {
    if (this.socket) {
      return;
    }

    console.log('Connecting to socket', this.url);

    await this._initConnection();

    this.socket = io(this.url.origin);

    this.socket.on('connect', () => {
      console.log('Connected.');
    });

    this.socket.on('connect_error', (err) => {
      console.error('Socket connection error.', err);
      // TODO: Debounce this, do some flag stuff or cancel request.
      this._initConnection();
    });
  }

  disconnect() {
    if (!this.socket) return;
    this.socket.disconnect();
  }

  emit(event, data) {
    if (!this.socket) {
      console.error('Socket not connected.');
      return;
    }
    this.socket.emit(event, data);
  }

  on(event, callback) {
    if (!this.socket) {
      console.error('Socket not connected.');
      return;
    }
    this.socket.on(event, callback);
  }
}
