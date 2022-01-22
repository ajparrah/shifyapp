import express from 'express';
import pino from 'pino-http';
import pinoPretty from 'pino-pretty';

const app = express();
app.use(
  pino(
    pinoPretty({
      translateTime: `UTC:yyyy-mm-dd'T'HH:MM:ss.l`,
      colorize: true,
      singleLine: true,
    })
  )
);

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Everything is OK!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
