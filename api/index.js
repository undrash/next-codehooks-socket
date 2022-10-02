import { app, Datastore } from 'codehooks-js';
import { SocketHooks } from './@codehooks/socket';
import { getFormattedDateTime } from './utils.js';

const socket = new SocketHooks(app);

const Cron = {
  EVERY_SECOND: '*/1 * * * * *',
};

const Topics = {
  MAIN: 'MAIN',
};

app.queue(Topics.MAIN, async (req, res) => {
  const { dateTime } = req.body.payload;

  if (!socket) return res.end();

  socket.emit('datetime', dateTime);
  res.end();
});

app.job(Cron.EVERY_SECOND, async (req, res) => {
  const conn = await Datastore.open();

  await conn.enqueue(Topics.MAIN, {
    dateTime: getFormattedDateTime(),
  });

  res.end();
});

app.get('/hello', async (req, res) => {
  console.log('I run locally, cool!');
  res.json({ message: 'Codehooks' });
});

app.socket('hello', (msg) => {
  console.log('Message received from NextJS:', msg);
});

app.socket('hallaisen', (msg) => {
  console.log('Message received from NextJS', msg);
});

export default app.init();
